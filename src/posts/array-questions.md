---
title: Array Questions
author: "Michael Yang"
date: 2024-07-27
tags:
  - array
category: cp
---

## <u>LC3026 Maximum Good Subarray Sum</u>

Subarray is good if `abs(a[l] - a[r])`==`k`. Find the subarray with maximum sum that is good.

### Java Solution

```java
class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Long> p = new HashMap<>();
        // p.get(i) is the value of the prefix sum up to but not including a[i]
        p.put(nums[0], 0L);
        long s = 0;
        int n = nums.length;
        long ans = Long.MIN_VALUE;
        for (int i = 0; i < n; ++i) {
            s += nums[i];
            // if previously in the array there was an element k less than current element
            if (p.containsKey(nums[i] - k)) {
                // prefix sum up to current element, minus prefix sum up to
                // (but not inclusive of) the left boundary
                ans = Math.max(ans, s - p.get(nums[i] - k));
            }
            // if previously in array there was an element k more than current element
            if (p.containsKey(nums[i] + k)) {
                ans = Math.max(ans, s - p.get(nums[i] + k));
            }
            // if not at end of array,
            // and next element has not been seen yet
            // OR, if next element has been seen but
            // prefix sum up to next element is the current sum value 's'
            if (i + 1 < n && (!p.containsKey(nums[i + 1]) || p.get(nums[i + 1]) > s)) {
                p.put(nums[i + 1], s);
            }
        }
        return ans == Long.MIN_VALUE ? 0 : ans;
    }
}
```

### C++ Solution

```cpp
class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, long long> p;
        p[nums[0]] = 0;
        long long s = 0;
        const int n = nums.size();
        long long ans = LONG_LONG_MIN;
        for (int i = 0;; ++i) {
            s += nums[i];
            auto it = p.find(nums[i] - k);
            if (it != p.end()) {
                ans = max(ans, s - it->second);
            }
            it = p.find(nums[i] + k);
            if (it != p.end()) {
                ans = max(ans, s - it->second);
            }
            if (i + 1 == n) {
                break;
            }
            it = p.find(nums[i + 1]);
            if (it == p.end() || it->second > s) {
                p[nums[i + 1]] = s;
            }
        }
        return ans == LONG_LONG_MIN ? 0 : ans;
    }
};
```

[Answer from [doocs](https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3026.Maximum%20Good%20Subarray%20Sum/README_EN.md)]

## <u>LC3001 Minimum Moves to Capture Queen</u>

Given the position `(e, f)` of a black queen, `(a, b)` of a white rook and `(c, d)` of a white bishop on an 8x8, 1-based chess board, calculate the minimum number of moves to capture the queen.

<u>Approach</u>: If the queen is on the same row or column as the rook and the bishop is not blocking, or if the queen is on the same diagonal as the bishop and the rook is not blocking, it takes only one move. Otherwise, it takes two.

## <u>LC3244 Minimum Array Changes to Make Differences Equal</u>

Given an even-sized array, in one move you can replace any element with a value in the range `[0, k]`. Find the minimum number of moves such that for all `0 <= i < n`, `abs(a[i] - a[n - i - 1]) = X` for some integer `X`.

Constraints: `0` <= `a[i]` <= `k` <= `10e5`

### Brute Force

Try all possible values of differences, and for each value, iterate through the array to find the number of operations required. Time Complexity: O(n \* k)

### Greedy

Intuitively, we might want to change all pairs whose difference is not equal to the most frequent difference value. However, this is not guaranteed to work. Sometimes it might be optimal to change the elements to a difference value that is not the most frequently appearing in the array.

### Binary Search

Binary search on values of `X` is not guaranteed to work either, since there is no 'turning point' between the value of `X` and the number of operations required.

### Maximum Possible Difference

For each pair, assuming we make only one change operation, the maximum possible difference after the change is the maximum of `right - left`, `right - 0`, or `k - left`, where we assume `right > left` (and swap them if not).

If the `right - left` is already the value of `X` we are trying to achieve, it takes 0 operations.

If the value of `X` that we want to achieve is greater than the maximum possible difference of that pair, then it would cost 2 change operations.

We can use a **difference array** to mark the start and end of the possible values of differences where it would only take one change operation, and use **prefix sum** to accumulate the values at the end.

```python
class Solution:
    def minChanges(self, nums, k):
        n = len(nums)
        change_count = [0] * (k + 2)
        change_count[0] = n // 2

        for i in range(n // 2):
            left = nums[i]
            right = nums[n - i - 1]
            cur_diff = abs(left - right)
            max_diff = max(left, right, k - left, k - right)

            change_count[cur_diff] -= 1
            change_count[cur_diff + 1] += 1

            # In order to achieve a difference greater than max_diff, we need 2 operations,
            # (1 more operation than for difference values between 1 and max_diff)
            change_count[max_diff + 1] += 1

        cur_changes = 0
        min_changes = n // 2
        for i in range(k + 1):
            cur_changes += change_count[i]
            min_changes = min(min_changes, cur_changes)

        return min_changes
```

```python
# Other solution
class Solution:
    def minChanges(self, nums: List[int], k: int) -> int:
        d = [0] * (k + 2)
        n = len(nums)
        for i in range(n // 2):
            x, y = nums[i], nums[-i - 1]
            if x > y:
                x, y = y, x
            d[0] += 1
            d[y - x] -= 1
            d[y - x + 1] += 1
            d[max(y, k - x) + 1] -= 1
            d[max(y, k - x) + 1] += 2
        return min(accumulate(d))
```

## LC3299 Minimum Operations to Make Array Equal to Target

An operation counts as taking a subarray and either incrementing or decrementing it by 1. Find the minimum number of operations to make the input array equal to the target array.
