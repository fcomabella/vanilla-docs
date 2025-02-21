export const PromiseMother = <T = void>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error | null) => void;
} => {
  let resolver: (value: T) => void = () => {};
  let rejector: (error: Error | null) => void = () => {};

  const promise = new Promise<T>((resolve, reject) => {
    resolver = (sessionInfo: T): void => resolve(sessionInfo);
    rejector = (error: Error | null): void => reject(error);
  });

  return { promise, resolve: resolver, reject: rejector };
};
