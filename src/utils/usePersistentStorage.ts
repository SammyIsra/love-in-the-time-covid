import { useEffect, useState } from "react";

/**
 * Hook to use either localStorage or sessionStorage.
 * I got the idea from a talk by Michael Jackson about composability in React
 */
function usePersistentState(
  storage: Storage,
  key: string,
  initialValue: string = ""
) {
  // create store by fetching from store or using default
  const [state, setState] = useState<string>(
    () => storage.getItem(key) || initialValue
  );

  // -Save to storage whenever the state changes
  // -key and storage are listed as dependencies since they are used in the effect,
  //  but in reality only the state will change at any time UNLESS the user changes the key,
  //  which... not cool bro
  useEffect(() => storage.setItem(key, state), [state, key, storage]);

  // Return the same stuff you get from useState
  return [state, setState] as const;
}

/**
 * Hook to use either localStorage
 * @param key
 * @param initialValue
 */
export function useLocalStorageState(key: string, initialValue: string = "") {
  return usePersistentState(localStorage, key, initialValue);
}
/**
 * Hook to use either localStorage
 * @param key
 * @param initialValue
 */
export function useSessionStorageState(key: string, initialValue: string = "") {
  return usePersistentState(sessionStorage, key, initialValue);
}
