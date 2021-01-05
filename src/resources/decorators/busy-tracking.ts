type IMethodDecorator<T> = (target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

export function busyTracking<T>(isBusyPropertyName?: string): IMethodDecorator<T> {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const givenFunc: (...params: unknown[]) => Promise<unknown> = propertyKey && target[propertyKey];
    if (!givenFunc?.call) {
      throw Error(`busyTracking Decorator should be used on function only! you used it on [${propertyKey}]`);
    }

    isBusyPropertyName = isBusyPropertyName || `${propertyKey}_isBusy`;
    // changing the given function by altering it's descriptor value
    // using "function" syntax to take advantage of correct "this" scope
    descriptor.value = function (...params: unknown[]) {
       // increments counter takes care of "NaN" of first time running
      this[isBusyPropertyName] = (this[isBusyPropertyName] || 0) + 1;
      const originalRetVal: Promise<unknown> = givenFunc.call(this, ...params);
      if (originalRetVal?.finally) {
        return originalRetVal.finally(() => this[isBusyPropertyName]--);
      }
      else {
        console.warn(`you used 'busyTracking' on a function that is not returning a promise [${propertyKey}]`);
        this[isBusyPropertyName]--;
      }
      
      // returning the original retVal so we don't change the function behavior
      return originalRetVal;
    }
    return descriptor;
  };
}
