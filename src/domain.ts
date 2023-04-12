export class Domain<T> {
    private is_in: (x: T) => boolean;

    Domain(valid_values: Array<T> | ((x: T) => boolean)) {
        if (valid_values instanceof Array<T>) {
            this.is_in = (x: T) => {
                return valid_values.includes(x);
            };
        }
        else {
            this.is_in = valid_values;
        }
    }

    // checks if the value x is in the domain
    check(x: T): boolean {
        return this.is_in(x);
    }
}
