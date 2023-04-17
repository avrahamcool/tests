import { AgeFilterEnum } from "./age-filter-enum";
export class App
{
	constructor()
	{
		for(const i of AgeFilterEnum)
		{
			console.log(i);
		}
	}
}
