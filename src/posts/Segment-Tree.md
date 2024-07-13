---
title: "Fenwick Tree"
author: "Michael Yang"
date: 2024-07-10
tags:
  - fenwick tree
  - binary indexed tree
---

### Sum over a range

```java
int sum(int i) {
    int sum = 0;
    while (i > 0) {
        sum += T[i];
        i -= i & (-i); // flip the last set bit
    }
    return sum;
}
```

`i -= i & -i` gets the parent of the current node

<br>

### Point update

```java
void add(int i, int val) {
    while (i < T.length) {
        T[i] += k;
        i += i & -i; // add last set bit
    }
}
```

`i += i & -i` adds the last set bit, propagating the changes to child nodes

<br>

### Building the Fenwick Tree

```java
int[] make(int[] ar) {
    int[] tree = Arrays.copyOf(ar, ar.length);
    for (int i = 1; i < tree.length; i++) {
        int p = i + (i & -i); // index to parent
        if (p < t.length) {
            tree[p] = tree[p] + tree[i];
        }
    }
    return tree;
}
```

This builds the fenwick tree from the original array

## Example Questions
