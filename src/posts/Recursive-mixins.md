---
title: Recursive Mixins
author: "Michael Yang"
date: 2024-08-17
tags:
  - sass
  - css
category: sass
---

## Recursive Mixins in Sass

Recently, at work, I had to implement a custom treeview which was making use of PatternFly's TreeView react component. However, the component API did not expose any methods to change the padding and indentation levels of each item within the tree, and I needed granular access to adjust the styles.

The codebase was using Sass, so I had to figure out how to override the css style classes.

```sass
// _dynamic-padding.scss
$base-padding-left: 2rem;
$nested-indent-padding-left: 1rem;

@mixin dynamic-padding($depth: 0) {
    $_padding-left: $base-padding-left + $depth * $nested-indent-padding-left;
    $_guide-padding-left: $_padding-left - 2.75rem;

    > ul.pf-c-tree-view__list {
        > li.pf-c-tree-view__list-item {
            @if $depth < 15 {
                @include dynamic-padding($depth + 1);
            }

            > div.pf-c-tree-view__content {
                > span.pf-c-tree-view__node {
                    padding-left: #{$_padding-left}rem;

                    @if $depth > 0 {
                        &::before {
                            left: #{$_guide-padding-left}rem;
                        }
                    }
                }
            }

            @if $depth > 0 {
                &::before {
                    left: #{_guide-padding-left}rem;
                }
            }
        }
    }
}

// _custom-treeview.scss
@import "../mixins/_dynamic-padding";

.custom-treeview {
    .pf-c-tree-view {
        @include dynamic-padding();
    }
}
```

It looked something along those lines.

In the first two lines, I declared two new variables for the base padding and the extra padding to add to each item based on its level of nesting.

The `@mixin dynamic-padding($depth: 0)` declares a reusable CSS style rule which can take in an argument `depth` which defaults to 0 if nothing is passed in.

I include the mixin in the root of the tree, i.e. `.pf-c-tree-view`, so that its immediate children elements `ul` and `li` would be affected.

The recursive mixin comes into play in `@include dynamic-padding($depth + 1)`. I added an extra break condition `@if $depth < 15 { ... }` to prevent Sass from infinitely looping, with 15 being just an arbitrary number.

Lastly, it is worth noting that the use of the direct child selector `>` is crucial here. Without using the direct child selector, Sass will try to apply the mixin rule to **all** descentants of the root treeview, which was a bug I faced initially and which caused the page to not load entirely.
