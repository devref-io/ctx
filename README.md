# @devref/ctx

An easy to use, alternative API for React's createContext.

[![Build Size](https://img.shields.io/bundlephobia/minzip/@devref/ctx?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=@devref/ctx)

## Installation

```
npm install @devref/ctx
```

## Usage

Create a new context with a function that returns the context value.
You'll get back the Provider and a hook to use the context value.

```tsx
// useCount.ts
import { createContext } from "@devref/ctx";
import { useState } from "react";

export const [CountProvider, useCount] = createContext(() => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((count) => count + 1);

  const isGreaterThanTen = count > 10;

  return {
    count,
    setCount,
    increment,
    isGreaterThanTen,
  };
});
```

Wrap your application in the Provider, as you normally do.

```tsx
import { CountProvider } from "./useCount";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountProvider>
      <App />
    </CountProvider>
  </StrictMode>
);
```

Use the hook you got when creating the context within your components.

```tsx
import { useCount } from "./useCount";

function Counter() {
  const { count, increment } = useCount();

  return <button onClick={increment}>count is {count}</button>;
}
```
