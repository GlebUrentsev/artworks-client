import React from 'react';

import { breakpoints, BREAKPOINT_NAMES, BREAKPOINT_NAMES_KEYS } from '../tokens';

const getDeviceConfig = (width: number) => {
  if (width < breakpoints.tablet) {
    return BREAKPOINT_NAMES.mobile;
  }

  if (width >= breakpoints.tablet && width <= breakpoints.desktopS) {
    return BREAKPOINT_NAMES.tablet;
  }

  if (width >= breakpoints.desktopS && width < breakpoints.desktopM) {
    return BREAKPOINT_NAMES.desktopS;
  }

  if (width >= breakpoints.desktopM && width < breakpoints.desktopL) {
    return BREAKPOINT_NAMES.desktopM;
  }

  return BREAKPOINT_NAMES.desktopL;
};

const useBreakpoint = (): BREAKPOINT_NAMES_KEYS => {
  const [breakpoint, setBreakpoint] = React.useState<BREAKPOINT_NAMES_KEYS>(() => getDeviceConfig(window.innerWidth));

  React.useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getDeviceConfig(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export const useBreakpointState = () => {
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === BREAKPOINT_NAMES.mobile;
  const isTablet = breakpoint === BREAKPOINT_NAMES.tablet;
  const isDesktopS = breakpoint === BREAKPOINT_NAMES.desktopS;
  const isDesktopM = breakpoint === BREAKPOINT_NAMES.desktopM;
  const isDesktopL = breakpoint === BREAKPOINT_NAMES.desktopL;

  return {
    isMobile,
    isTablet,
    isDesktopS,
    isDesktopM,
    isDesktopL,
  };
};
