import React from "react";
import {
  createContext as nativeCreateContext,
  useContext,
  FC,
  PropsWithChildren,
} from "react";

const UninitializedContextMark = Symbol("uninitialized");

export function createContext<T>(
  setup: () => T
): [FC<PropsWithChildren>, () => T] {
  const Context = nativeCreateContext<T | typeof UninitializedContextMark>(
    UninitializedContextMark
  );

  function Provider({ children }: PropsWithChildren) {
    const value = setup();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  const use = () => {
    const value = useContext(Context);
    if (value == UninitializedContextMark) {
      throw new Error("Missing context provider");
    }
    return value;
  };
  return [Provider, use];
}
