import { autoinject } from "aurelia-framework";


@autoinject()
export class App
{
	public value: string;
	public delay = 1000;
	public doStuff(): void
	{
		console.log("value", this.value);
	}
}
