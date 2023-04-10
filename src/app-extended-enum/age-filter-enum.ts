export class AgeFilterEnum
{
	private static _uniqueId = 0;
	private static _entries: AgeFilterEnum[] = [];

	static NoFilter: Readonly<AgeFilterEnum> = new AgeFilterEnum("הכל");
	static Adult: Readonly<AgeFilterEnum> = new AgeFilterEnum("מבוגרים");
	static Children: Readonly<AgeFilterEnum> = new AgeFilterEnum("ילדים");

	public id: Readonly<number>;

	private constructor(public displayName: Readonly<string>)
	{
		this.id = ++AgeFilterEnum._uniqueId;

		AgeFilterEnum._entries.push(this);
	}

	public static [Symbol.iterator](): IterableIterator<AgeFilterEnum>
	{
		return AgeFilterEnum._entries[Symbol.iterator]();
	}
}
