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
		let index = 0;
		for(const value of items)
		{
			const overrideContext = createFullOverrideContext(repeat, value, index, undefined);

			repeat.addView(overrideContext.bindingContext, overrideContext);
			++index;
		}
	}

	public static IteratorStrategyMatcher(items: unknown): boolean
	{
		return typeof items[Symbol.iterator] === "function";
	}
}
