import React, { createContext, useContext } from "react";
import { useLocalObservable, observer } from "mobx-react-lite";

import ProgressBarStore from "./ProgressBarStore";
import SnackbarStore from "./SnackbarStore";
import ThemeStore from "./ThemeStore";

// Add your store here
const Stores = {
  progressBar: ProgressBarStore,
  snackbar: SnackbarStore,
  theme: ThemeStore,
};
export type TAppStore = typeof Stores;

const StoreContext = createContext<any>(null);

export const StoreProvider = (props: { children: React.ReactNode }) => {
  let combinedStore: TAppStore = Stores;
  for (const [key, value] of Object.entries(Stores)) {
    combinedStore[key as keyof TAppStore] = useLocalObservable(
      () => value
    ) as any;
  }

  return (
    <StoreContext.Provider value={combinedStore}>
      {props.children}
    </StoreContext.Provider>
  );
};

/**
 * Your component must be wrapped with the 'MobXObserver' HOC to use this hook.
 */
export const useStore = <Key extends keyof TAppStore>(name: Key) => {
  const stores = useContext<TAppStore>(StoreContext);

  if (!stores) {
    throw new Error(
      "Stores cannot be null. Did you call the hook inside a context provider (StoreProvider)?"
    );
  }

  const store = stores[name];

  if (!store) {
    throw new Error(`Store ${String(name)} not found`);
  }

  return store;
};

/**
 * Alias the observer HOC from the 'mobx-react-lite' package to use the 'useStore' hook
 */
export const MobXObserver = observer;
