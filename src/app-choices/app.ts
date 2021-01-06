import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";

export class App
{
	selected = 3;
	x;

	private populateArray()
	{
		this.x = [
			{
				label: "OP 1",
				value: 1
			},
			{
				label: "OP 2",
				value: 2
			},
			{
				label: "OP 3",
				value: 3
			},
			{
				label: "OP 4",
				value: 4
			}
		];
	}
}
