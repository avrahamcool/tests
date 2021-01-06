import { busyTracking } from "resources/decorators/busy-tracking";
import { cache } from "resources/decorators/cache";

export class App
{
	prop = 1;

	@busyTracking()
	public defaultWork(): Promise<string>
	{

		this.prop++;
		return new Promise<string>(resolve =>
		{
			setTimeout(() =>
			{
				resolve("defaultWork Done");
			}, 1000);
		});

	}

	@busyTracking()
	public workOtherBoolean(): Promise<string>
	{
		return this.defaultWork();
	}

	@cache()
	public someFunc(todo: number): Promise<unknown>
	{
		return fetch(`https://jsonplaceholder.typicode.com/todos/${ todo }`)
			.then(response => response.json());
	}

	x = 0;
	cacheTest(): void
	{
		const todo = (this.x++ % 3) + 1;
		this.someFunc(todo)
			.then(x => console.log(todo, x));
	}
}
