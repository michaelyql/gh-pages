---
title: Java Notes
author: "Michael Yang"
date: 2024-08-08
tags:
  - java
category: java
---

## Module (from Java SE9)

Modules

- contain packages
- can state other packages that they are dependent on
- can select internal packages to export and expose publicly

This information is kept in `module-info.java`.

`src/main/java` should be treated as the root directory of the source files.
