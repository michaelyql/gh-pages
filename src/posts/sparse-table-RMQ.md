---
title: "Sparse Table RMQ"
author: "Michael Yang"
date: 2024-06-17
tags:
  - cp
  - sparse tables
  - arrays
category: ds
---

## Problem Statement

Given an array A of size **N**, and given **Q** queries where each query wants to find the minimum element in the range **[l, r]**, find an efficient way to process all the queries.

<br>

### Brute Force:

Time Complexity: O(Q\*N)

<br>

### Dense Table

Calculate every possible interval: O(N^2 + Q)

<br>

### Sparse Table

We don't need to calculate every interval, just a few of them (logarithmic in number).

<br>

<u>Approach</u>: Maintain a 2D array `int m[][]` where `m[i][j]` represents the minimum element of the range `[i, i + (1 << j)]`, i.e. the range (inclusive) starting at `i` with a length of 2 to the power of `j`. For example, `m[1][2]` will store the minimum value in the range `[1, 5]`. With this, we are able to find the minimum value in any range in O(1) time.

<br>

The approach is essentially to calculate all ranges of size `1 << i` for `i <= log2(n)`. If the length of the query is not a perfect power of 2, we take the **next closest power of 2** and we consider ranges of those lengths.

<br>

We need only consider the ranges from the **start** of the index, and from the **end, backwards**. This is because the length of range we are scanning would cover more than half of the query range (either from the start or backwards from the end), but not enough to cover the entire query range.

<br>

### Example

If the query was `[1, 7]`, the answer would be `min(m[1][2], m[4][2])`. Let's take a look at that:

- The length of the query range is 7-1+1 = 7.
- The range is not a perfect power of 2; the next closest power of 2 is 4.
- If we query ranges of length 4 from the start (index 1) and backwards from the end (index 7), We would cover the entire query range.
- `[1, 4]` would cover 1, 2, 3, 4
- `[4, 7]` would cover 4, 5, 6, 7
- It does not matter that there is an overlap at index 4. If `A[4]` was the smallest value in the query range, `m[1][2]` and `m[4][2]` would return the same answer.

```cpp
const int MAX_N = 100'005;
const int LOG = 17;
int a[MAX_N];
int m[MAX_N][LOG];

int query(int L, int R) {

}
```

<br>

## Related Problems

text

<br>

## Resources

text
