import { autoinject } from 'aurelia-framework';
import { Person, State } from "./models";
import { PersonService } from './persons-service';
import { TrackingContext } from "./tracking-context";
import "flatpickr/dist/flatpickr.min.css";

@autoinject()
export class App
{
	constructor(private personService: PersonService) { }

	personContext: TrackingContext<Person>;
	states: State[] = [
		{
			value: 1,
			description: "israel"
		},
		{
			value: 2,
			description: "france"
		},
		{
			value: 3,
			description: "dubai"
		},
	];

	private activate()
	{
		this.personService
			.getPersons()
			.then(entities => new TrackingContext(entities, 'id'))
			.then(context => this.personContext = context);
	}

	uniqueID = 2;
	save(): void
	{
		const diff = this.personContext.getDiff();
		console.log(diff);
		//TODO: send to server - receive IDS back
		diff.created.forEach(x => x.id = ++this.uniqueID);
		this.personContext.commit();
	}
}
