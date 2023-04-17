export class AgeFilterEnum
{
	//#region Implementation
	private static _uniqueId = 0;
	private static _entries: AgeFilterEnum[] = [];

	public static [Symbol.iterator](): IterableIterator<AgeFilterEnum>
	{
		return AgeFilterEnum._entries[Symbol.iterator]();
	}

	//#endregion Implementation

	static readonly NoFilter = new AgeFilterEnum("הכל");
	static readonly Adult = new AgeFilterEnum("מבוגרים");
	static readonly Children = new AgeFilterEnum("ילדים");

	public readonly id: number;
	public readonly displayName: string;

	private constructor(displayName: string)
	{
		this.id = AgeFilterEnum._uniqueId++;
		this.displayName = displayName;

		AgeFilterEnum._entries.push(this);
	}
}
