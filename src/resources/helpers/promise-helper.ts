export const promiseCanceled = Symbol("promiseCanceled");

declare global
{
	interface Promise<T>
	{
		withAbortSignal(abortSignal: AbortSignal): Promise<T>;
		rejectIfNull(): Promise<T>;
		wait(milliseconds: number): Promise<T>;
		pipe(onfulfilled: ((value: T) => void)): Promise<T>;

		/** @deprecated use for debug only - don't forget to remove before check-in */
		logToConsole(): Promise<T>;
	}

	interface PromiseConstructor
	{
		wait(milliseconds: number): Promise<never>;
	}
}

Promise.prototype.withAbortSignal = function <T>(this: Promise<T>, abortSignal: AbortSignal): Promise<T>
{
	return Promise.race<T>([
		this,
		new Promise<T>((_, reject) =>
		{
			abortSignal.addEventListener("abort", () => reject(promiseCanceled));
		})
	]);
};

Promise.prototype.rejectIfNull = async function <T>(this: Promise<T>): Promise<T>
{
	const response = await this;
	return response ?? Promise.reject();
};

Promise.prototype.wait = async function <T>(milliseconds: number): Promise<T>
{
	const response = await this;
	return new Promise(resolve => setTimeout(resolve, milliseconds, response));
};

Promise.prototype.pipe = async function <T>(onfulfilled: ((value: T) => void)): Promise<T>
{
	const response = await this;
	onfulfilled(response);
	return response;
};

Promise.prototype.logToConsole = async function <T>(): Promise<T>
{
	// eslint-disable-next-line no-console
	return this.pipe(console.log);
};

Promise.wait = async function (milliseconds: number): Promise<never>
{
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};
