import { autoinject, bindable, bindingMode, BindingEngine, TaskQueue, Disposable } from "aurelia-framework";
import IMask from "imask/esm/imask";

@autoinject
export class MaskCustomAttribute
{
	@bindable({ defaultBindingMode: bindingMode.oneTime, primaryProperty: true }) private options: string | IMask.AnyMaskedOptions;

	private element: HTMLInputElement;
	private maskInstance: IMask.InputMask<IMask.AnyMaskedOptions>;
	private valueSyncHandler: Disposable;

	constructor(element: Element, private bindingEngine: BindingEngine, private taskQueue: TaskQueue)
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
				mask: this.options
			} : this.options;

		this.maskInstance = IMask(this.element, options);
		this.valueSyncHandler = this.bindingEngine.propertyObserver(this.element, "value")
			.subscribe((newValue: string) =>
			{
				this.taskQueue.queueTask(() =>
				{
					if (this.maskInstance.value !== newValue)
					{

						this.maskInstance.value = newValue;

						this.element.dispatchEvent(new Event('change'));
					}
				});
			});
		this.element.dispatchEvent(new Event('change'));
	}
	private detached()
	{
		this.valueSyncHandler.dispose();
		this.maskInstance.destroy();
	}
}
