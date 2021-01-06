import { PLATFORM } from "aurelia-pal";
import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration): void
{
	config.globalResources([
		PLATFORM.moduleName("./attributes/mask"),
		PLATFORM.moduleName("./attributes/tippy"),
		PLATFORM.moduleName("./attributes/choices"),
		PLATFORM.moduleName("./attributes/flatpickr"),
		PLATFORM.moduleName("./value-converters/json"),
		PLATFORM.moduleName("./value-converters/included-by-field")
	]);
}
