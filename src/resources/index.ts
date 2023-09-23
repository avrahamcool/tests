import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { RepeatStrategyLocator } from "aurelia-templating-resources";
import { IteratorStrategy } from "./repeat-strategies/iterable-repeat-strategy";
import "./helpers/promise-helper";

export function configure(config: FrameworkConfiguration): void {
	config.globalResources([
		PLATFORM.moduleName("./value-converters/json"),
		PLATFORM.moduleName("./binding-behaviors/async")
	]);

	config.container
		.get(RepeatStrategyLocator)
		.addStrategy(IteratorStrategy.IteratorStrategyMatcher, new IteratorStrategy());
}
