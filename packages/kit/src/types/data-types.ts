export type Constructable<T> = new (...args: any[]) => T;
export type MapValueType<T> = T extends Map<any, infer V> ? V : never;
export type SetValueType<T> = T extends Set<infer V> ? V : never;
