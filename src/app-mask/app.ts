import IMask from "imask/esm/imask";
import 'imask/esm/masked/number';

export class App
{
	public value = "t1223456";
	public value2 = "123abc";

	// public options: IMask.AnyMaskedOptions = {
	// 	mask: /^ז?\d{0,9}$/,
	// };

	public options: IMask.AnyMaskedOptions = {
		mask: Number,
		scale: 2,
		normalizeZeros: false,  // appends or removes zeros at ends
		radix: '.',  // fractional delimiter
		mapToRadix: ['.'],  // symbols to process as radix
		min: -10000,
		max: 10000
	};
}
