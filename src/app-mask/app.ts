import IMask from "imask";

export class App
{
	public numberValue = "300.00";
	public numberUnmasked = "300";
	public numberOptions: IMask.AnyMaskedOptions = {
		mask: Number,
		scale: 2,
		normalizeZeros: true,  // appends or removes zeros at ends
		padFractionalZeros: true,
		radix: '.',  // fractional delimiter
		mapToRadix: ['.'],  // symbols to process as radix
		min: -10000,
		max: 10000
	};



	public regexOptions: IMask.AnyMaskedOptions = {
		mask: /^ז?\d{0,9}$/,
	};
}
