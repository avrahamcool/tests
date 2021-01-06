import { Person } from "./models";
import cloneDeep from "lodash/cloneDeep";

export class PersonService
{
	private persons: Person[] = [];

	constructor()
	{
		const p1 = Object.assign(new Person(), {
			id: 1,
			firstName: "avraham",
			lastName: "essoudry",
			birthDate: new Date(1989, 2, 15),
			isAlive: true,
			numberOfTeeth: 24,
			state: 1
		});

		const p2 = Object.assign(new Person(), {
			id: 2,
			firstName: "test",
			lastName: "test",
			birthDate: new Date(1915, 1, 1),
			isAlive: false,
			numberOfTeeth: 4,
			state: 3
		});
		this.persons.push(p1, p2);
	}


	// simulating a service without cache - each call return a new clone
	getPersons(): Promise<Person[]>
	{
		return Promise.resolve(cloneDeep(this.persons));
	}

	// batch(asd: Diff<Person>)
	// {

	// }
}
