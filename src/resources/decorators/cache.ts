type IMethodDecorator<T> = (target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

export function cache<T>(): IMethodDecorator<T> {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const givenFunc: (...params: unknown[]) => unknown = propertyKey && target[propertyKey];
    if (!givenFunc?.call) {
      throw Error(`cache Decorator should be used on function only! wrong usage at [${propertyKey}]`);
    }

    // holding all results of previous calls in a map, allowing caching differently for each parameter
    const cachedResultMap = new Map<string, unknown>();

    // changing the given function by altering it's descriptor value
    // using "function" syntax to take advantage of correct "this" scope
    descriptor.value = function (...params: unknown[]): unknown {
      const cacheKey = JSON.stringify(params);
      if(!cachedResultMap.has(cacheKey))
      {
        cachedResultMap.set(cacheKey, givenFunc.call(this, ...params));
      }
      return cachedResultMap.get(cacheKey);
    }
    return descriptor;
  };
}
