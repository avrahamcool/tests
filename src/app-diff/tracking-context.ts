import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

/** determines if two objects match, based on a custom logic */
export type MatcherFunction<T> = (obj1: T, obj2: T) => boolean;

/** determines if two objects match, based on key or a matcher function */
export type ObjectMatcher<T> = string | MatcherFunction<T>;

/** result of the getDiff function*/
export interface Diff<T>
{
	created: T[],
	updated: T[],
	deleted: T[]
}

export class TrackingContext<T>
{
	private original: T[];
	private matcher: MatcherFunction<T>;

	constructor(public entities: T[], keyOrMatcher: ObjectMatcher<T>)
	{
		// transform simple key into a matcher function
		this.matcher = typeof keyOrMatcher === "string"
			? (o1, o2) => o1[keyOrMatcher] === o2[keyOrMatcher]
			: keyOrMatcher;

		this.commit();
	}

	public commit(): void
	{
		this.original = cloneDeep(this.entities);
	}

	public getDiff(): Diff<T>
	{
		if (!this.original.length)
		{
			return {
				created: this.entities,
				updated: [],
				deleted: []
			};
		}

		const created: T[] = this.entities.filter(newObj =>
		{
			const match = this.original.find(originalObj => this.matcher(originalObj, newObj));
			return !match;
		});

		const updated: T[] = [];
		const deleted: T[] = [];

		this.original.forEach(originalObj =>
		{
			const match = this.entities.find(newObj => this.matcher(originalObj, newObj));
			if (!match)
			{
				deleted.push(originalObj);
			}
			else if (!isEqual(originalObj, match))
			{
				updated.push(match);
			}
		});

		return {
			created,
			updated,
			deleted
		};
	}
}
