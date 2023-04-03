export class AgeFilterEnum
{
	private static _uniqueId = 0;
	private static _entries: AgeFilterEnum[] = [];

	public id: number;
	private constructor(public displayName: string)
	{
		this.id = ++AgeFilterEnum._uniqueId;

		AgeFilterEnum._entries.push(this);
	}

	static NoFilter: AgeFilterEnum = new AgeFilterEnum("הכל");
	static Adult: AgeFilterEnum = new AgeFilterEnum("מבוגרים");
	static Children: AgeFilterEnum = new AgeFilterEnum("ילדים");

	public static [Symbol.iterator](): IterableIterator<AgeFilterEnum>
	{
		return AgeFilterEnum._entries[Symbol.iterator]();
	}
}
