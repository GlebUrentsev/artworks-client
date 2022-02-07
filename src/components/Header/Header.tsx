import React from 'react';
import styled from 'styled-components';

import { BejamasLogo, Cart } from '../../common/assets';
import { INDENT, adaptive } from '../../common/tokens';
import { bottomDevider } from '../../common/styled-utils/bottom-devider';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${INDENT.l} ${INDENT.none};
  ${bottomDevider};

  ${adaptive.maxWidth.tablet} {
    padding: ${INDENT.xs};
    margin: 0 -${INDENT.xs};
  }
`;

const BejamasLogoStyled = styled(BejamasLogo)`
  ${adaptive.maxWidth.tablet} {
    height: 20px;
  }
`;

const CartStyled = styled(Cart)`
  ${adaptive.maxWidth.tablet} {
    width: 32px;
    height: 32px;
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <BejamasLogoStyled />
      <CartStyled />
    </HeaderWrapper>
  );
};
