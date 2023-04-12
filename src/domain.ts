export interface Checker {
    is_in(v: any): boolean;
}

export class Domain<T> implements Checker {
    private _is_in: (x: T) => boolean;

    constructor(valid_values: Array<T> | ((x: T) => boolean)) {
        if (valid_values instanceof Array<T>) {
            this._is_in = (x: T) => {
                return valid_values.includes(x);
            };
        }
        else {
            this._is_in = valid_values;
        }
    }

    // checks if the value x is in the domain
    is_in(x: T): boolean {
        return this._is_in(x);
    }
}
