export const BREAKPOINT_NAMES = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktopS: 'desktopS',
  desktopM: 'desktopM',
  desktopL: 'desktopL',
} as const;

export type BREAKPOINT_NAMES_KEYS = keyof typeof BREAKPOINT_NAMES;

export const breakpoints: Record<BREAKPOINT_NAMES_KEYS, number> = {
  mobile: 320,
  tablet: 700,
  desktopS: 992,
  desktopM: 1304,
  desktopL: 1440,
};

export const adaptive = {
  maxWidth: {
    mobile: `@media only screen and (max-width: ${breakpoints.tablet}px)`,
    customMobile: `@media only screen and (max-width: ${400}px)`,
    tablet: `@media only screen and (max-width: ${breakpoints.desktopS}px)`,
    desktopS: `@media only screen and (max-width: ${breakpoints.desktopM}px)`,
    desktopM: `@media only screen and (max-width: ${breakpoints.desktopL}px)`,
  },
};
