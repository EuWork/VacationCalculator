import { breakpointsBuilder } from "libs";

export const breakpointTablet = 820;
export const breakpointTabletExtra = 1024;
export const breakpointDesktop = 1280;
export const breakpointDesktopExtra = 1560;

export const breakpointTabletMin = `min-width: ${breakpointTablet}px`;
export const breakpointTabletExtraMin = `min-width: ${breakpointTabletExtra}px`;
export const breakpointDesktopMin = `min-width: ${breakpointDesktop}px`;
export const breakpointDesktopExtraMin = `min-width: ${breakpointDesktopExtra}px`;

export const createBreakpointFrom = breakpointsBuilder({
  tablet: breakpointTabletMin,
  tabletExtra: breakpointTabletExtraMin,
  desktop: breakpointDesktopMin,
  desktopExtra: breakpointDesktopExtraMin,
});

export const breakpointTabletMax = `max-width: ${breakpointTablet - 1}px`;
export const breakpointTabletExtraMax = `max-width: ${breakpointTabletExtra - 1}px`;
export const breakpointDesktopMax = `max-width: ${breakpointDesktop - 1}px`;
export const breakpointDesktopExtraMax = `max-width: ${breakpointDesktopExtra - 1}px`;

export const createBreakpointTo = breakpointsBuilder({
  tablet: breakpointTabletMax,
  tabletExtra: breakpointTabletExtraMax,
  desktop: breakpointDesktopMax,
  desktopExtra: breakpointDesktopExtraMax,
});
