---
title: React Router Link
author: "Michael Yang"
date: 2024-08-06
tags:
  - react
  - javascript
category: react
---

## Passing Data between Links

Passing data between different pages can be done easily using the `useLocation()` hook from `react-router-dom` and the `<Link>` component. You can pass dynamic state into the link, for example, letting the endpoint know which page the user navigated from, and doing some conditional rendering logic from there. Below is a simple example:

```js
import { useLocation } from "react-router-dom";

const Component = () => {
  const { state } = useLocation();
  return (
    <Link to="other-page" state={{ data: ["Item 1", "Item 2"] }}>
      Go to other page
    </Link>
  );
};
```
