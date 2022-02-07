import React from 'react';
import styled from 'styled-components';
import { INDENT, adaptive, breakpoints } from '../../common/tokens';

const LayoutComponent = styled.div`
  margin: ${INDENT.none} ${INDENT.auto};
  padding: ${INDENT.none} ${INDENT.xs};
  max-width: ${breakpoints.desktopL}px;

  ${adaptive.maxWidth.desktopM} {
    max-width: ${breakpoints.desktopM}px;
  }

  ${adaptive.maxWidth.desktopS} {
    max-width: ${breakpoints.desktopS}px;
  }

  ${adaptive.maxWidth.tablet} {
    max-width: ${breakpoints.tablet}px;
  }
`;

export const AdaptiveLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return <LayoutComponent>{children}</LayoutComponent>;
};
