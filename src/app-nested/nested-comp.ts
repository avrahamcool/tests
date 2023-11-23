import { bindable, bindingMode } from "aurelia-framework";

export class NestedComp
{
	@bindable({defaultBindingMode: bindingMode.twoWay}) public selectedInNested = "FromNested";

	availableValues = ["a", "b", "c"];
}
