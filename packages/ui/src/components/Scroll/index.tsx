import React from "react";
import cn from "classnames";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import { provideRef } from "@worksolutions/react-utils";
import { OverlayScrollbars, ScrollbarsAutoHideBehavior, ScrollbarsVisibilityBehavior } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

import { ScrollProvider, ScrollProviderContextInterface } from "components/ScrollProvider";

import { desktopScrollOuterStyle } from "./style.css";

export interface ScrollInterface {
  style?: Record<string, any>;
  className?: string;
  children: React.ReactNode;
  scrollbarsAutoHideBehavior?: ScrollbarsAutoHideBehavior;
  scrollbarsVisibility?: ScrollbarsVisibilityBehavior;
  scrollProviderRef?: React.Ref<ScrollProviderContextInterface>;
  browserRenderContentWhenScrollProviderIsUnsafe?: boolean;
}

function ScrollComponent(props: ScrollInterface) {
  return (
    <ScrollProvider>
      <ScrollOverlay {...props} />
    </ScrollProvider>
  );
}

export const Scroll = React.memo(ScrollComponent);

function ScrollOverlay({
  style,
  className,
  children,
  scrollbarsAutoHideBehavior = "scroll",
  scrollbarsVisibility = "auto",
  browserRenderContentWhenScrollProviderIsUnsafe = false,
  scrollProviderRef,
}: ScrollInterface) {
  const [instance, setInstance] = React.useState<OverlayScrollbars | null>(null);

  React.useEffect(() => {
    if (!instance) return;
    const { host, viewport } = instance.elements();
    provideRef(scrollProviderRef)({
      wrapperElement: host,
      scrollableElement: viewport,
      desktopOverlayScrollbarsInstance: instance,
    });
  }, [instance, scrollProviderRef]);

  const init = React.useCallback(
    (scrollbars: OverlayScrollbarsComponentRef | null) => {
      if (!scrollbars) {
        if (instance) instance.destroy();
        return;
      }

      const timer = setTimeout(() => setInstance(scrollbars.osInstance()), 30);
      return () => clearTimeout(timer);
    },
    [instance],
  );

  const options = React.useMemo<Parameters<typeof OverlayScrollbarsComponent>[0]["options"]>(
    () => ({
      scrollbars: { autoHide: scrollbarsAutoHideBehavior, clickScroll: true, visibility: scrollbarsVisibility },
      updateOnLoad: ["img"],
    }),
    [scrollbarsAutoHideBehavior, scrollbarsVisibility],
  );

  return (
    <OverlayScrollbarsComponent
      ref={init}
      style={style}
      className={cn(desktopScrollOuterStyle, className)}
      options={options}
    >
      {typeof window === "undefined"
        ? children
        : browserRenderContentWhenScrollProviderIsUnsafe
          ? children
          : instance && children}
    </OverlayScrollbarsComponent>
  );
}

export { scrollbarBackgroundVar, scrollbarBackgroundHoverVar, scrollbarBackgroundActiveVar } from "./style.css";
