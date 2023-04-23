# A CSP solver

A strongly typed general purpose finite CSP solver supporting arbitrary
constraints and domains. It uses backtracking algorithm with AC-3 inference and
MRV heuristic.

# Usage

Here's an example illustrating how you can solve a classic graph coloring problem

```typescript
type Color = 'R' | 'G' | 'B';
const colors: Color[] = ['R', 'G', 'B'];

type Region = "WA" | "NT" | "SA" | "Q" | "NSW"
const regions: Region[] = ["WA", "NT", "SA", "

let map = new HashMap<Region, Color[]>;
for (let reg of regions)
    map.set(reg, [... colors]);

let isdiff = (c1: Color, c2: Color) => c1 !==
let cons = new Constraints<Region, Color>;
cons = new Constraints();
cons.add('SA', 'WA', isdiff);
cons.add('SA', 'NT', isdiff);
cons.add('SA', 'Q', isdiff);
cons.add('SA', 'NSW', isdiff);
cons.add('SA', 'V', isdiff);
cons.add('WA', 'NT', isdiff);
cons.add('NT', 'Q', isdiff);
cons.add('Q', 'NSW', isdiff);
cons.add('NSW', 'V', isdiff);

let csp = new Csp<[Region, Color]>(map, cons);

let sol = new Assignment<[Region, Color]>();
let isfound = backtracking(csp, sol);                     ```

if (isfound) {
    console.log("A solution is: ", sol);
}
else {
    console.log("No solution :(");
}

```

## What's with the generic tuples?

Many generic type parameters defined here are of the form `<[Key, Value]>` as
opposed to the more intuitive `<Key, Value>` generics. This is to ensure type
safety when using non-homogeneous variables or domains. Imagine we have an odd
CSP where we have to solve a sudoku puzzle while simultaneously solving a graph
coloring problem (under such circumstances, we notice that the resulting
constraint graph contains two independent subgraph, which we can split for the
sake of performance, but let's ignore that for now). If we were to use generics
of the form `<Region | Position, Color | Digit>`, then we cannot ensure type
safety as a `Region` may be mistakenly associated with a `Digit` instead of a
digit. Using `[Region, Color] | [Position, Digit]` eliminates the possibility
of such errors.

## But why type safety?

There's really no particular reason why this project cares about type safety
other than it was an interesting experiment and a fun demonstration of
typescript's powerful type :)
