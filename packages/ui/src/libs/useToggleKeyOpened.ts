import React from "react";
import { useToggle } from "@worksolutions/react-utils";
import { useKeyPress } from "react-use";

export function useToggleKeyOpened(key: string) {
  const [opened, toggleOpened] = useToggle(false);
  const [pressed] = useKeyPress(key);

  React.useEffect(() => {
    if (!pressed) return;
    toggleOpened();
  }, [pressed, toggleOpened]);

  return opened;
}
