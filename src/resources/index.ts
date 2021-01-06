import { PLATFORM } from "aurelia-pal";
import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration): void
{
	config.globalResources([
		PLATFORM.moduleName("./value-converters/json"),
		PLATFORM.moduleName("./binding-behaviors/async")
	]);
}
