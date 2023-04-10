const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const project = require("./aurelia_project/aurelia.json");
const { AureliaPlugin } = require("aurelia-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// config helpers:
const ensureArray = config => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
	condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const outDir = path.resolve(__dirname, project.platform.output);
const srcDir = path.resolve(__dirname, "src");
const baseUrl = "/";

const cssRules = [
	{
		loader: "css-loader"
	}
];

const sassRules = [
	{
		loader: "sass-loader",
		options: {
			sassOptions: {
				includePaths: ["node_modules"]
			}
		}
	}
];

module.exports = ({ production }, { analyze, hmr, port, host }) => ({
	resolve: {
		extensions: [".ts", ".js"],
		modules: [srcDir, "node_modules"],

		alias: {
			// https://github.com/aurelia/dialog/issues/387
			// Uncomment next line if you had trouble to run aurelia-dialog on IE11
			// 'aurelia-dialog': path.resolve(__dirname, 'node_modules/aurelia-dialog/dist/umd/aurelia-dialog.js'),

			// https://github.com/aurelia/binding/issues/702
			// Enforce single aurelia-binding, to avoid v1/v2 duplication due to
			// out-of-date dependencies on 3rd party aurelia plugins
			"aurelia-binding": path.resolve(__dirname, "node_modules/aurelia-binding")
		}
	},
	entry: {
		app: [
			// Uncomment next line if you need to support IE11
			// 'promise-polyfill/src/polyfill',
			"aurelia-bootstrapper"
		]
	},
	mode: production ? "production" : "development",
	output: {
		path: outDir,
		publicPath: baseUrl,
		filename: production ? "[name].[chunkhash].bundle.js" : "[name].[fullhash].bundle.js",
		chunkFilename: production ? "[name].[chunkhash].chunk.js" : "[name].[fullhash].chunk.js"
	},
	optimization: {
		runtimeChunk: true,
		moduleIds: "deterministic",
		splitChunks: {
			hidePathInfo: true,
			chunks: "initial",
			maxInitialRequests: Infinity,
			maxAsyncRequests: Infinity,
			minSize: 10000,
			maxSize: 40000,
			cacheGroups: {
				default: false,
				vendorSplit: {
					test: /[\\/]node_modules[\\/]/,
					name(module)
					{
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `vendor.${packageName.replace("@", "")}`;
					},
					priority: 20
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					priority: 19,
					enforce: true
				},
				vendorAsyncSplit: {
					test: /[\\/]node_modules[\\/]/,
					name(module)
					{
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `vendor.async.${packageName.replace("@", "")}`;
					},
					chunks: "async",
					priority: 10,
					reuseExistingChunk: true,
					minSize: 5000
				},
				vendorsAsync: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors.async",
					chunks: "async",
					priority: 9,
					reuseExistingChunk: true,
					enforce: true
				},
				commonAsync: {
					name(module)
					{
						const moduleName = module.context.match(/[^\\/]+(?=\/$|$)/)[0];
						return `common.async.${moduleName.replace("@", "")}`;
					},
					minChunks: 2,
					chunks: "async",
					priority: 1,
					reuseExistingChunk: true,
					minSize: 5000
				},
				commonsAsync: {
					name: "commons.async",
					minChunks: 2,
					chunks: "async",
					priority: 0,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	},
	performance: { hints: false },
	devServer: {
		// serve index.html for all 404 (required for push-state)
		historyApiFallback: true,
		open: project.platform.open,
		hot: hmr || project.platform.hmr,
		port: port || project.platform.port,
		host: host
	},
	devtool: production ? undefined : "cheap-module-source-map",
	module: {
		rules: [
			// CSS required in JS/TS files should use the style-loader that auto-injects it into the website
			// only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
			{
				test: /\.css$/i,
				issuer: { not: [ /\.html$/i ] },
				use: [ { loader: MiniCssExtractPlugin.loader }, ...cssRules ]
			},
			{
				test: /\.css$/i,
				issuer: /\.html$/i,
				// CSS required in templates cannot be extracted safely
				// because Aurelia would try to require it again in runtime
				use: cssRules
			},
			{
				test: /\.scss$/,
				use: [ { loader: MiniCssExtractPlugin.loader }, ...cssRules, ...sassRules ],
				issuer: /\.[tj]s$/i
			},
			{
				test: /\.scss$/,
				use: [...cssRules, ...sassRules],
				issuer: /\.html?$/i
			},
			// Skip minimize in production build to avoid complain on unescaped < such as
			// <span>${ c < 5 ? c : 'many' }</span>
			{ test: /\.html$/i, loader: "html-loader", options: { minimize: false } },
			{ test: /\.ts$/, loader: "ts-loader" },
			// embed small images and fonts as Data Urls and larger ones as files:
			{ test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset" },
			{ test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,  type: "asset" },
			{ test: /environment\.json$/i, use: [
				{loader: "app-settings-loader", options: {env: production ? "production" : "development" }}
			]}
		]
	},
	plugins: [
		new DuplicatePackageCheckerPlugin(),
		new AureliaPlugin(),
		new HtmlWebpackPlugin({
			template: "index.ejs",
			metadata: {
				// available in index.ejs //
				baseUrl
			}
		}),
		// ref: https://webpack.js.org/plugins/mini-css-extract-plugin/
		new MiniCssExtractPlugin({ // updated to match the naming conventions for the js files
			filename: production ? "[name].[contenthash].bundle.css" : "[name].[fullhash].bundle.css",
			chunkFilename: production ? "[name].[contenthash].chunk.css" : "[name].[fullhash].chunk.css"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "static", to: outDir, globOptions: { ignore: [".*"] } }
			]
		}), // ignore dot (hidden) files
		...when(analyze, new BundleAnalyzerPlugin()),
		/**
     * Note that the usage of following plugin cleans the webpack output directory before build.
     * In case you want to generate any file in the output path as a part of pre-build step, this plugin will likely
     * remove those before the webpack build. In that case consider disabling the plugin, and instead use something like
     * `del` (https://www.npmjs.com/package/del), or `rimraf` (https://www.npmjs.com/package/rimraf).
     */
		new CleanWebpackPlugin()
	]
});
