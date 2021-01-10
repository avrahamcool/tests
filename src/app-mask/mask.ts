import { autoinject, bindable, bindingMode, TaskQueue } from "aurelia-framework";
import IMask from "imask";

@autoinject
export class MaskCustomAttribute
{
	@bindable({ defaultBindingMode: bindingMode.oneTime }) private options: string | IMask.AnyMaskedOptions;
	@bindable({ defaultBindingMode: bindingMode.twoWay }) private value: string;
	@bindable({ defaultBindingMode: bindingMode.twoWay }) private unmasked: string;

	private element: HTMLInputElement;
	private maskInstance: IMask.InputMask<IMask.AnyMaskedOptions>;

	constructor(element: Element, private taskQueue: TaskQueue)
	{
		if (!(element instanceof HTMLInputElement))
		{
			throw new Error(`masked CustomAttribute can ony be used on <input> you used it on <${ element.tagName }>`);
		}

		this.element = element;
	}

	private attached()
	{
		const options = (typeof this.options === "string") ?
			{
				mask: this.options,
			} : this.options;
		this.maskInstance = IMask(this.element, options);

		this.maskInstance.on("accept", this.syncHandler);

		if (this.value)
		{
			this.maskInstance.value = this.value;
		}
		else if (this.unmasked)
		{
			this.maskInstance.unmaskedValue = this.unmasked;
		}
	}

	private syncHandler = () =>
	{
		this.value = this.maskInstance.value;
		this.unmasked = this.maskInstance.unmaskedValue;
	}

	private valueChanged(newValue: string)
	{
		if (this.maskInstance && this.maskInstance.value !== newValue)
		{
			this.taskQueue.queueMicroTask(() =>
			{
				this.maskInstance.value = newValue;
			});
		}
	}
	private unmaskedChanged(newValue: string)
	{
		if (this.maskInstance && this.maskInstance.unmaskedValue !== newValue)
		{
			this.taskQueue.queueMicroTask(() =>
			{
				this.maskInstance.unmaskedValue = newValue;
			});
		}
	}
	private detached()
	{
		this.maskInstance.off("accept", this.syncHandler);
		this.maskInstance.destroy();
	}
}
