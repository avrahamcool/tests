import { Aurelia, PLATFORM } from "aurelia-framework";
import environment from "../config/environment.json";
import { App } from "app-checkboxes/app";

export function configure(aurelia: Aurelia): void
{
	aurelia.use
		.standardConfiguration()
		.developmentLogging(environment.debug ? "debug" : "warn")
		.feature(PLATFORM.moduleName("resources/index"));

	aurelia.start().then(() => aurelia.setRoot(App));
}
