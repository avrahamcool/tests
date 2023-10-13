import { autoinject } from "aurelia-framework";

type Tab = {
	name: string;
	isActive: boolean;
};
@autoinject()
export class App
{
	tabs: Tab[];
	constructor()
	{
		this.tabs = Array(20)
			.fill(0)
			.map((_, i) => (
				{
					name: `tab ${i+1}`,
					isActive: false
				})
			);
	}
}
