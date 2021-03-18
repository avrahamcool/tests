import { deepComputedFrom } from "aurelia-deep-computed";
import { Node } from "./node";

export class App
{
	root: Node;
	constructor()
	{
		this.root = {
		};

		this.root.child = {
			parent: this.root
		}
	}

	//@deepComputedFrom("root")
	get combined(): string
	{
		let root = this.root;
		let value = "";
		while (root)
		{
			value += `${ root.value } =>`;
			root = root.child;
		}
		return value;
	}
}
