---
title: Bit Questions
author: "Michael Yang"
date: 2024-08-03
tags:
  - bit manipulation
category: cp
---

## 3226 Number of Bit Changes to Make Two Integers Equal

Given two numbers `n` and `k`, find the number of changes needed to turn `n` into `k` by changing bits from 1 to 0 in their binary representation, or -1 if it is not possible.

```cpp
int minChanges(unsigned n, unsigned k) {
    // n needs to be a superset of k.
    return (n & k) == k ? popcount(n ^ k) : -1;
}
```
