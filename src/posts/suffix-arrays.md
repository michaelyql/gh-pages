---
title: "Suffix Arrays"
author: "Michael Yang"
date: 2024-06-08
tags:
  - strings
  - arrays
category: ds
---

<br>

A suffix array is a **sorted** array of all the suffixes of a string.

For example, a string "acb" has the suffixes "acb", "cb", and "b". The suffix array would look like `[0, 2, 1]` which represents that the suffix starting at index 0 is the smallest suffix, followed by the suffix starting at index 2, followed by the suffix starting at index 1.

Note that suffixes are always assumed to end at the last character of the string.

<br>

### Construction of Suffix Array

Append an end-of-string character that is lower than any of the alphabets in terms of their ASCII value. `$` or a space `" "` do just fine.

Sort the suffixes **incrementally**, that is, sort all the suffixes by their first character, then sort them by their first two characters, then sort them by their first four characters, then their first eight, etc. The trick is to reuse the previous iteration of sorting to cut down on repeated computation.

Each iteration of sorting doubles the length of the string being compared. In total, there will be log2n iterations of this sorting. If we were to use a normal sorting algorithm which takes O(n log n), the overall time complexity would be O(n \* (log n)^2). We can achieve an even better time, O(n log n) using a radix sort which takes O(n) time, and by using a concept of **'equivalence classes'**.

"Equivalence classes" is just a fancy way of saying "their position after the previous iteration of sorting", where 'equal' elements are grouped together

<br>

### Longest Common Prefix (LCP)

Longest common prefix is an array representing the **longest common prefix** between each pair of **adjacent suffixes** in the suffix array, where `lcp[i]` represents the LCP between `suff[i]` and `suff[i-1]`. Why might we need this?

Note that every possible substring of a given string is actually just the _prefix_ of a _suffix_. We can use the LCP table alongside the suffix array to answer questions about substrings.

As an aside, a suffix array that has a LCP table is typically called an _enhanced suffix array_.

<br>

### Uses of Suffix Arrays

[This website](https://cp-algorithms.com/string/suffix-array.html) outlines three applications of suffix arrays.

1. Finding the smallest **cyclic shift** of a string
2. Finding a substring in a string using **binary search** on the suffix array
3. Comparing two substrings of a string in O(1) time, using a similar strategy as sparse tables
