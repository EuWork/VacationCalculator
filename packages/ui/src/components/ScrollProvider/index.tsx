import React from "react";
import { provideRef } from "@worksolutions/react-utils";
import { OverlayScrollbars } from "overlayscrollbars";

export interface ScrollProviderContextInterface {
  wrapperElement: HTMLElement | Window;
  scrollableElement: HTMLElement | Window;
  desktopOverlayScrollbarsInstance?: OverlayScrollbars;
}

export const ScrollProviderContext = React.createContext<ScrollProviderContextInterface>(undefined!);

interface ScrollProviderInterface {
  children: React.JSX.Element;
  renderWithUnsafeScrollProviderContextValue?: boolean;
}

function ScrollProviderComponent({ children }: ScrollProviderInterface) {
  const currentScroll = React.useContext(ScrollProviderContext);
  const [scrollProvider, setScrollProvider] = React.useState<ScrollProviderContextInterface>(currentScroll);

  const newProps = React.useMemo(
    () => ({ scrollProviderRef: provideRef(setScrollProvider, children.props.scrollProviderRef) }),
    [children.props.scrollProviderRef],
  );

  return (
    <ScrollProviderContext.Provider value={scrollProvider}>
      {React.cloneElement(children, newProps)}
    </ScrollProviderContext.Provider>
  );
}

export const ScrollProvider = React.memo(ScrollProviderComponent);

export * from "./GetScrollProvider";
