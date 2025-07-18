export function runInPromiseQueue(promiseQueueFieldName: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const func = descriptor.value! as any;
    descriptor.value = function (this: any, ...args: any[]) {
      return this[promiseQueueFieldName](() => func.apply(this, args));
    } as any;
  };
}
