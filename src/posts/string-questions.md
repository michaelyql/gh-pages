---
title: String Questions
author: "Michael Yang"
date: 2024-08-03
tags:
  - strings
  - cp
category: cp
---

## 3228 Number of Operations to Move Ones to the End

Given a binary string containing only 0's and 1's, you can choose any 1 whose next character is not 0, and shift it to the right all the way until it reaches the end of a string, or another 1. This counts as one operation. Find the maximum number of operations you can perform.

```cpp
int maxOperations(string s) {
    int ans = 0;
    int ones = 0;

    for (int i = 0; i < s.length(); ++i)
      if (s[i] == '1')
        ++ones;
      else if (i + 1 == s.length() || s[i + 1] == '1')
        ans += ones;

    return ans;
}
```

## 3227 Vowels Game in a String

Given initial string `s`, Alice starts first, Bob goes second, Alice must remove any non-empty substring containing an odd number of vowels while Bob has to do so for substrings with an even number of vowels. The first player who cannot remove a substring on their turn loses. Find if Alice wins.

```cpp
public:
    bool doesAliceWin(string s) {
        // Let k be the number of vowels in s.
        // 1. If k == 0, Bob wins since Alice has no vowels to pick.
        // 2. If k % 2 == 1, Alice wins since Alice can pick the entire string.
        // 3. If k % 2 == 0, Alice wins since Alice can pick (k - 1) vowels,
        // then Bob will either pick a substring containing 0 vowels, resulting in
        // Alice picking the remaining entire string, or Bob couldn't pick at all
        // (the last vowel).
        return ranges::any_of(s, [=](char c) { return isVowel(c); });
    }

private:
    bool isVowel(char c) {
        static constexpr string_view kVowels = "aeiou";
        return kVowels.find(c) != string_view::npos;
    }
;
```

## 3223 Minimum Length of Strings After Operations

Given a string, you can perform the following operation any number of times: choose an index `i` such that there is at least one character to the left and right of `i` that is equal to `s[i]`, then delete the closest such element on the left and right of `i`. Find the minimum possible length of the string.

```cpp
int minimumLength(string s) {
    int cnt[26]{}; // or vector<int> count(26);
    for (char& c : s) {
        ++cnt[c - 'a'];
    }
    int ans = 0;
    for (int x : cnt) {
        if (x) {
            ans += x % 2 ? 1 : 2;
        }
    }
    return ans;
}
```
