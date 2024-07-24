---
title: "IntelliJ Setup"
author: "Michael Yang"
date: 2024-07-24
tags:
  - java
  - intellij
category:
---

## Content Root

> The content root should be the **root** directory for the project containing everything, including the source code, test files and all the other roots.

Configuring the rest of the root types can be done in `File` > `Project Structure` > `Project Settings` > `Module`

For example, if your project had a structure like `/my-proj/src/main/java/com/package/Main.java`, the content root would be `/my-proj`.

<br>

### Sources Root

> Sources root is the main directory containing source code files, which are included in the **classpath** and are compiled.

This would be `/my-proj/src/main/java`.

<br >

### Resources Root

> The directory containing **non-source code** files, e.g. XML files, property files. Files here are accessible at runtime.

### Test Sources Root

> The directory containing the test files, like for JUnit.

This would be `/my-proj/src/test/java`.

<br>

### Test Resources Root

> Contains resources used by the test source code. Like the resources root, but for testing.

### Excluded Files

> Files and directories ignored by IntelliJ. They are not included in the classpath or compiled.

### Generated Sources Root

> Contain code that is generated, typically by build tools.
