---
title: Tagging in Git
author: "Michael Yang"
date: 2024-07-28
tags:
  - git
  - source control
category: git
---

## Tagging in Git

Tagging commits in Git is a way to mark specific points in your repository's history. Tags are often used to mark release points (e.g., `v1.0`, `v2.0`).

### Creating a Tag

> **Annotated tags** are stored as full objects in the Git database and include metadata such as the tagger name, email, date, and a tagging message. This is the most common and recommended way to create tags.

```bash
git tag -a v1.0 -m "Version 1.0"
```

`v1.0` is the tag name, and `-m "Version 1.0"` is the message associated with the tag.

<br>

> **Lightweight tags** are just pointers to a commit (like a branch), without any additional metadata.

```bash
git tag v1.0-light
```

`v1.0-light` is the tag name.

### Listing Tags

To list all tags in your repository, use:

```bash
git tag
```

To list tags with a specific pattern:

```bash
git tag -l 'v1.0.*'
```

### Tagging a Specific Commit

If you want to tag a commit other than the latest one, provide the commit hash at the end of the tag command:

```bash
git tag -a v1.0.1 <commit-hash> -m "Version 1.0.1"
```

### Pushing Tags to Remote

By default, tags are not pushed to the remote repository when you push commits. To push a specific tag:

```bash
git push origin v1.0
```

To push all tags:

```bash
git push --tags
```

### Deleting a Tag

To delete a tag locally:

```bash
git tag -d v1.0
```

To delete a tag from the remote repository:

```bash
git push origin --delete tag v1.0
```

### Checking Out a Tag

You can create a new branch based on a tag:

```bash
git checkout -b new-branch v1.0
```

This checks out the tag and creates a new branch at that point.
