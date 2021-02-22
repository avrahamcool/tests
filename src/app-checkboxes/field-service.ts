import { Field } from "./field";
import { FieldGroup } from "./field-group";

export class FieldService
{
	groups = [
		new FieldGroup("Group 1", [
			new Field(1, "display 1", "field 1"),
			new Field(2, "display 2", "field 2"),
			new Field(3, "display 3", "field 3")
		]),
		new FieldGroup("Group 2", [
			new Field(1, "display 4", "field 4"),
			new Field(2, "display 5", "field 5"),
			new Field(3, "display 6", "field 6")
		]),
		new FieldGroup("Group 3", [
			new Field(1, "display 7", "field 7"),
			new Field(2, "display 8", "field 8"),
			new Field(3, "display 9", "field 9")
		])
	];
	getGroups(): Promise<FieldGroup[]>
	{
		return Promise.resolve(this.groups);
	}

	getSelected(): Promise<string[]>
	{
		return Promise.resolve([
			"field 1",
			"field 2",
			"field 3",
			"field 6",
			"field 5",
		]);
	}
}
