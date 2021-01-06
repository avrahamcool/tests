export interface Worker
{
	id: number;
	name: string;
}

export interface Activity
{
	activityName: string;
	workers: Worker[];
	selected: Worker;
}
