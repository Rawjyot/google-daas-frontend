import { useRef } from "react";
import { useLayoutEffect } from "./useLayoutEffect";

export function useFocusRef(isSelected) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!isSelected) return;

    //   ref.current?.focus(true);
  }, [isSelected]);

  return {
    ref,
    tabIndex: isSelected ? 0 : -1,
  };
}
