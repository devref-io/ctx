import React from "react";
import {
  createContext as nativeCreateContext,
  useContext,
  FC,
  PropsWithChildren,
} from "react";

export function createContext<T extends {}>(
  setup: () => T
): [FC<PropsWithChildren>, () => T] {
  const Context = nativeCreateContext<T | null>(null);

  function Provider({ children }: PropsWithChildren) {
    const value = setup();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  const use = () => {
    const value = useContext(Context);
    if (!value) {
      throw new Error("Missing context provider");
    }
    return value;
  };
  return [Provider, use];
}
