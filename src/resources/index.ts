import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { RepeatStrategyLocator } from "aurelia-templating-resources";
import { IteratorStrategy } from "./repeat-strategies/iterable-repeat-strategy";
import "./helpers/promise-helper";

export function configure(config: FrameworkConfiguration): void
{
	config.globalResources([
		PLATFORM.moduleName("./binding-behaviors/async"),
		PLATFORM.moduleName("./custom-attributes/my-ref"),
		PLATFORM.moduleName("./value-converters/json")
	]);

	config.container
		.get(RepeatStrategyLocator)
		.addStrategy(IteratorStrategy.IteratorStrategyMatcher, new IteratorStrategy());
}
