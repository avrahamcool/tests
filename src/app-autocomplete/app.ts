import names from "./generated.json";

export class App
{
	names: string[];
	attached()
	{
		this.names = names.map(x => x.name);
	}
	changeSource()
	{
		this.names = names.map(x => x.name).slice(0, 1000);
	}
}
