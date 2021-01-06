export interface State
{
	value: number;
	description: string;
}

export class Person
{
	id: number;
	firstName: string;
	lastName: string;
	birthDate: Date;
	isAlive: boolean;
	numberOfTeeth: number;
	state: number;
}
