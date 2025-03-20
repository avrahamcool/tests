import { autoinject } from "aurelia-dependency-injection";
import { View } from "aurelia-templating";

@autoinject()
export class MyRefCustomAttribute
{
	value: string;
	owningView: View;

	constructor(private element: Element){}

	created(owningView: View)
	{
		this.owningView = owningView;
	}

	bind()
	{
		this.owningView.bindingContext[this.value] = this.element;
	}

	unbind()
	{
		this.owningView.bindingContext[this.value] = null;
	}
}
