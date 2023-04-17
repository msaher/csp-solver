export type Key<T extends [any, any]> = T extends [a: infer A, b: any] ? A : never;
export type Value<T extends [any, any]> = T extends [a: any, b: infer B] ? B : never;

export function wrap<T>(data: T | T[]): T[] {
    if (data instanceof Array)
        return data;
    else
        return [data];
}
