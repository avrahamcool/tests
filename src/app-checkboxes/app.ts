import { autoinject } from "aurelia-framework";
import { CheckboxGroupModel } from "./checkbox-group-model";
import { FieldService } from "./field-service";

@autoinject()
export class App
{
	cbGroups: CheckboxGroupModel[];
	selected: string[];
	constructor(service: FieldService)
	{
		Promise.all([service.getGroups(), service.getSelected()])
			.then(([groups, selected]) => groups.map(g => new CheckboxGroupModel(g.name, g.fields, selected)))
			.then(cbGroups => this.cbGroups = cbGroups);
	}


	public printAll(): void
	{
		this.selected = this.cbGroups.flatMap(g => g.selected);
	}
}
