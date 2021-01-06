import { autoinject, bindable, bindingMode } from "aurelia-framework";
import Choices, { Choices as ChoicesNS } from "choices.js";

@autoinject()
export class ChoicesCustomAttribute
{
	@bindable({ defaultBindingMode: bindingMode.twoWay }) private value: unknown;
	@bindable({ defaultBindingMode: bindingMode.toView }) private options: Array<ChoicesNS.Choice>;

	private element: HTMLInputElement | HTMLSelectElement;
	private choicesInstance: Choices;

	constructor(element: Element)
	{
		if (!(element instanceof HTMLSelectElement || element instanceof HTMLInputElement))
		{
			throw new Error(`masked CustomAttribute can ony be used on <select> || <input> you used it on <${ element.tagName }>`);
		}

		this.element = element;
	}
	private attached()
	{
		this.choicesInstance = new Choices(this.element, { choices: this.options || [] });
		this.choicesInstance.setChoiceByValue(this.value as string);
		this.element.addEventListener("choice", this.changedViaGUI);
	}
	private changedViaGUI = (event: CustomEvent<{ choice: ChoicesNS.Choice }>) =>
	{
		this.value = event.detail.choice.value;
	}
	private valueChanged(newValue: unknown)
	{
		if (!this.choicesInstance) { return; }

		if (newValue == undefined)
		{
			this.choicesInstance.removeActiveItems(null);
		}
		else
		{
			this.choicesInstance.setChoiceByValue(newValue as string);
		}
	}

	private optionsChanged(newValue: Array<ChoicesNS.Choice>)
	{
		if (this.choicesInstance && this.options?.length)
		{
			this.choicesInstance.clearStore();
			this.choicesInstance.setChoices(newValue);
			this.valueChanged(this.value);
		}
	}
	private detached()
	{
		this.element.removeEventListener("choice", this.changedViaGUI);
		this.choicesInstance.destroy();
	}
}
