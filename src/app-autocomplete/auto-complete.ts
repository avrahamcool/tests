import { autoinject, bindable, bindingMode } from "aurelia-framework";
import * as autoComplete from "js-autocomplete/auto-complete.js";

type AutocompleteInstance = { destroy: () => void };
type AutocompleteOptions = {
	selector: HTMLInputElement,
	source: (term: string, suggest: (values: string[]) => void) => void,
	minChars: number,
	cache: boolean,
	onSelect: (event: Event, term: string, item: string) => void
};

const AUTO_OPEN_LIMIT = 1000;

@autoinject()
export class AutoCompleteCustomAttribute
{
	@bindable({ defaultBindingMode: bindingMode.toView, primaryProperty: true }) private list: string[] = [];

	private element: HTMLInputElement;
	private autocompleteInstance: AutocompleteInstance;
	private afterAttach = false;
	private firstMatch: string;

	constructor(element: Element)
	{
		if (!(element instanceof HTMLInputElement))
		{
			throw new Error(`auto-complete CustomAttribute can ony be used on <input> you used it on <${ element.tagName }>`);
		}

		this.element = element;
	}

	private attached()
	{
		this.afterAttach = true;
		this.element.addEventListener("blur", this.blur);
		this.refreshAutoComplete();
	}

	private detached()
	{
		this.autocompleteInstance?.destroy();
		this.element.removeEventListener("blur", this.blur);
	}

	private listChanged()
	{
		this.refreshAutoComplete();
	}

	private refreshAutoComplete()
	{
		// can't do anything before attached finishes
		if (!this.afterAttach) { return; }

		// release previous instances if any
		if (this.autocompleteInstance)
		{
			this.autocompleteInstance.destroy();
			this.autocompleteInstance = null;
		}

		// create new autocomplete
		if (this.list?.length)
		{
			this.autocompleteInstance = autoComplete(<AutocompleteOptions>{
				selector: this.element,
				minChars: this.list.length > AUTO_OPEN_LIMIT ? 1 : 0,
				source: (term, suggest) =>
				{
					term = term.toLowerCase();
					const matches = this.list.filter(n => n.toLowerCase().includes(term));
					this.firstMatch = matches[0];
					suggest(matches);
				},
				onSelect: (_event, term, _item) =>
				{
					this.setValue(term);
					this.element.blur();
				},
				cache: false
			});
		}
	}

	private blur = () =>
	{
		if (!this.list.includes(this.element.value))
		{
			this.setValue(this.firstMatch);
		}
		return true;
	}

	private setValue(value: string)
	{
		this.element.value = value || "";
		this.element.dispatchEvent(new Event('change'));
	}
}
