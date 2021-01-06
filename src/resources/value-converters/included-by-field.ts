export class IncludedByFieldValueConverter
{
	toView(value: unknown, selected: unknown[], fieldName?: string): boolean
	{
		//null or empty array
		if (!selected?.length) return false;

		//looking for exact match
		if (!fieldName) return selected.includes(value);

		//looking for match by field
		return selected.some(item => item?.[fieldName] === value?.[fieldName]);
	}
}
