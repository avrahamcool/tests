import IMask from "imask/esm/imask";

export class App
{
	public value = "t1223456";
	public value2 = "123abc";

	public options: IMask.AnyMaskedOptions = {
		mask: /^ז?\d{0,9}$/,
	};
}
