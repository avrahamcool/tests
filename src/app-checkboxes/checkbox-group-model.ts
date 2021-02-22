import { computedFrom } from "aurelia-framework";
import { Field } from "./field";

export class CheckboxGroupModel
{
	constructor(public name: string, public items: Field[], public selected: string[])
	{
		const values = items.map(f => f.value);
		this.selected = selected.filter(s => values.includes(s));
	}

	@computedFrom("selected.length", "items.length")
	get toggleAll(): boolean
	{
		return this.selected.length === this.items.length;
	}
	set toggleAll(value: boolean)
	{
		this.selected = value ? this.items.map(f => f.value) : [];
	}

	@computedFrom("selected.length", "items.length")
	get indeterminate(): boolean
	{
		return this.selected.length && this.selected.length < this.items.length;
	}
}
