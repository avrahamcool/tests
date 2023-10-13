import { autoinject, BindingEngine, Disposable } from "aurelia-framework";
import { nameof } from "ts-simple-nameof";

@autoinject()
export class ShowIfPossibleCustomAttribute
{
	public isVisible = true;

	private element: HTMLElement;
	private parentElement: HTMLElement;
	private isParentDirectionLTR: boolean;
	private subscriptions: Disposable[] = [];

	constructor(element: Element, private bindingEngine: BindingEngine)
	{
		if (!(element instanceof HTMLElement))
		{
			throw new Error(`ShowIfPossible CustomAttribute can ony be used on <HTMLElement> you used it on <${ element.tagName }>`);
		}
		this.element = element;
	}

	private attached()
	{
		this.parentElement = this.element.parentElement;
		this.isParentDirectionLTR = window.getComputedStyle(this.parentElement).getPropertyValue("direction") === "ltr";

		const elementLeft = this.bindingEngine
			.propertyObserver(this.element, nameof((x: HTMLElement) => x.offsetLeft))
			.subscribe(this.setIsVisible);
		const parentLeft = this.bindingEngine
			.propertyObserver(this.parentElement, nameof((x: HTMLElement) => x.offsetLeft))
			.subscribe(this.setIsVisible);
		this.subscriptions.push(elementLeft, parentLeft);

		if (this.isParentDirectionLTR)
		{
			const elementWidth = this.bindingEngine
				.propertyObserver(this.element, nameof((x: HTMLElement) => x.offsetWidth))
				.subscribe(this.setIsVisible);

			const parentWidth = this.bindingEngine
				.propertyObserver(this.parentElement, nameof((x: HTMLElement) => x.offsetWidth))
				.subscribe(this.setIsVisible);

			this.subscriptions.push(elementWidth, parentWidth);
		}

		this.setIsVisible();
	}

	private detached()
	{
		this.subscriptions.forEach(s => s.dispose());
		this.subscriptions.length = 0;
	}

	private setIsVisible = () =>
	{
		const isVisible = this.isParentDirectionLTR
			? this.element.offsetLeft + this.element.offsetWidth <= this.parentElement.offsetLeft + this.parentElement.offsetWidth
			: this.element.offsetLeft >= this.parentElement.offsetLeft;

		if(this.isVisible !== isVisible)
		{
			this.isVisible = isVisible;
			this.element.classList.toggle("invisible", !isVisible);
		}
	};
}
