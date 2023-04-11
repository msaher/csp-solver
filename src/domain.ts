export class Domain<V> {
    private checker: (v: V) => boolean;

    Domain(valid_values: Array<V> | ((v: V) => boolean)) {
        if (valid_values instanceof Array<V>) {
            this.checker = (v: V) => {
                return valid_values.includes(v);
            };
        }
        else {
            this.checker = valid_values;
        }
    }

    // checks if the value v is in the domain
    check(v: V): boolean {
        return this.checker(v);
    }
}
