//import { autoinject } from "aurelia-framework";
import { ValidationRules, ValidationController, validateTrigger } from "aurelia-validation";
import { inject, NewInstance } from "aurelia-dependency-injection";
import { watch } from "aurelia-watch-decorator";


type Person =
{
	name: string;
	enableValidation: boolean;
};

@inject(NewInstance.of(ValidationController))
export class App
{
	public person: Person = {name: "", enableValidation: false};
	constructor(private controller: ValidationController)
	{

		const rules = ValidationRules
			.ensure((x: Person) => x.name)
			.required().when(x => x.enableValidation)
			.rules;

		this.controller.validateTrigger = validateTrigger.change;
		this.controller.addObject(this.person, rules);
	}

	@watch<App>(x => x.person.enableValidation)
	public revalidate(): void
	{
		this.controller.validate();
	}
}
