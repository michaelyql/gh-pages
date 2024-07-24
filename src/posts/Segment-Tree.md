---
title: "Segment Tree"
author: "Michael Yang"
date: 2024-07-10
tags:
  - segment tree
category: ds
---

## Fenwick Tree Implementation (Java)

```java
// Range query
int sum(int i) {
    int sum = 0;
    while (i > 0) {
        sum += T[i];
        i -= i & (-i); // flip the last set bit
    }
    return sum;
}

// Point update
void add(int i, int val) {
    while (i < T.length) {
        T[i] += k;
        i += i & -i; // add last set bit
    }
}

// Build tree
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

`i += i & -i` gets the parent range. E.g. `0001` --> `0010` --> `0100` --> `1000`.
`i -= i & -i` gets the remaining range. E.g. `1101` (13) --> `1100` (12) --> `0100` (8). So you sum up `T[13] + T[12] + T[8]`.

<br>

## C++ Implementation

```cpp
int n, t[4*MAXN];

void build(int a[], int v, int tl, int tr) {
    // tl and tr are the current left and right endpoints
    if (tl == tr) {
        t[v] = a[tl];
    } else {
        int tm = (tl + tr) / 2;
        build(a, v*2, tl, tm);
        build(a, v*2+1, tm+1, tr);
        t[v] = t[v*2] + t[v*2+1];
    }
}

int sum(int v, int tl, int tr, int l, int r) {
    // l and r are the query endpoints
    if (l > r)
        return 0;
    if (l == tl && r == tr) {
        return t[v];
    }
    int tm = (tl + tr) / 2;
    return sum(v*2, tl, tm, l, min(r, tm))
           + sum(v*2+1, tm+1, tr, max(l, tm+1), r);
}

void update(int v, int tl, int tr, int pos, int new_val) {
    if (tl == tr) {
        t[v] = new_val;
    } else {
        int tm = (tl + tr) / 2;
        if (pos <= tm)
            update(v*2, tl, tm, pos, new_val);
        else
            update(v*2+1, tm+1, tr, pos, new_val);
        t[v] = t[v*2] + t[v*2+1];
    }
}
```

<br>

## Range maximum and no. of times it appears

```cpp
pair<int, int> t[4*MAXN];

pair<int, int> combine(pair<int, int> a, pair<int, int> b) {
    if (a.first > b.first)
        return a;
    if (b.first > a.first)
        return b;
    return make_pair(a.first, a.second + b.second);
}

void build(int a[], int v, int tl, int tr) {
    if (tl == tr) {
        t[v] = make_pair(a[tl], 1);
    } else {
        int tm = (tl + tr) / 2;
        build(a, v*2, tl, tm);
        build(a, v*2+1, tm+1, tr);
        t[v] = combine(t[v*2], t[v*2+1]);
    }
}

pair<int, int> get_max(int v, int tl, int tr, int l, int r) {
    if (l > r)
        return make_pair(-INF, 0);
    if (l == tl && r == tr)
        return t[v];
    int tm = (tl + tr) / 2;
    return combine(get_max(v*2, tl, tm, l, min(r, tm)),
                   get_max(v*2+1, tm+1, tr, max(l, tm+1), r));
}

void update(int v, int tl, int tr, int pos, int new_val) {
    if (tl == tr) {
        t[v] = make_pair(new_val, 1);
    } else {
        int tm = (tl + tr) / 2;
        if (pos <= tm)
            update(v*2, tl, tm, pos, new_val);
        else
            update(v*2+1, tm+1, tr, pos, new_val);
        t[v] = combine(t[v*2], t[v*2+1]);
    }
}
```

<br>

## GCD / LCM over a range

Store the GCD / LCM of left and right child in the current vertex.

<br>

## Count number of zeros, find the k-th zero

```cpp
int find_kth(int v, int tl, int tr, int k) {
    if (k > t[v])
        return -1;
    if (tl == tr)
        return tl;
    int tm = (tl + tr) / 2;
    if (t[v*2] >= k)
        return find_kth(v*2, tl, tm, k);
    else
        return find_kth(v*2+1, tm+1, tr, k - t[v*2]);
```

<br>

## Example Questions
