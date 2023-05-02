import { createFullOverrideContext, Repeat, RepeatStrategy } from "aurelia-templating-resources";

export class IteratorStrategy implements RepeatStrategy
{
	public instanceChanged(repeat: Repeat, items: Iterable<unknown>): void
	{
		Promise.resolve()
			.then(() => repeat.removeAllViews(true, false))
			.then(() => this._standardProcessItems(repeat, items));
	}

	public instanceMutated(): void
	{
		return;
	}

	public getCollectionObserver(): void
	{
		return;
	}

	private _standardProcessItems(repeat: Repeat, items: Iterable<unknown>)
	{
		const arr = Array.from(items);
		const length = arr.length;

		arr.forEach((value, index) =>
		{
			const overrideContext = createFullOverrideContext(repeat, value, index, length);
			repeat.addView(overrideContext.bindingContext, overrideContext);
		});
	}

	public static IteratorStrategyMatcher(items: unknown): boolean
	{
		return typeof items[Symbol.iterator] === "function";
	}
}
