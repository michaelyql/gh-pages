---
title: ForwardRef in React
author: "Michael Yang"
date: 2024-08-02
tags:
  - react
  - javascript
category: react
---

## Use cases of forwardRef

In React, `forwardRef` is a higher-order component that allows you to forward a ref to a child component, which is especially useful when working with components that are not directly DOM elements.

```js
import React, { useRef, forwardRef } from "react";

// Define a child component using forwardRef
const InputComponent = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

// Parent component that renders the InputComponent
function ParentComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <InputComponent ref={inputRef} />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}
```

(From [https://www.dhiwise.com/post/react-workflow-how-to-pass-ref-to-child-effectively](https://www.dhiwise.com/post/react-workflow-how-to-pass-ref-to-child-effectively))
