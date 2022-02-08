import React, { useContext } from 'react';
import styled from 'styled-components';

import { BejamasLogo, CartIcon } from '../../common/assets';
import { INDENT, adaptive, COLORS, fontSizeLm } from '../../common/tokens';
import { bottomDevider } from '../../common/styled-utils/bottom-devider';
import { Cart } from '../Cart';
import { ProductsContext } from '../../state/ProductsProvider';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${INDENT.l} ${INDENT.none};
  ${bottomDevider};
  position: relative;

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

const CartStyled = styled(CartIcon)`
  cursor: pointer;
  ${adaptive.maxWidth.tablet} {
    width: 32px;
    height: 32px;
  }
`;

const CartButton = styled.button.attrs({
  type: 'button',
})`
  border: none;
  outline: none;
  background: transparent;
  margin: 0;
  padding: 0;
  position: relative;
`;

const CartCountToolip = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  width: 20px;
  height: 20px;
  font-weight: 700;
  ${fontSizeLm};
`;

export const Header = () => {
  const { cart, isCartOpen, toggleCart, clearCart } = useContext(ProductsContext);

  return (
    <HeaderWrapper>
      <BejamasLogoStyled />
      <CartButton onClick={() => toggleCart((prev) => !prev)}>
        <CartStyled />
        {cart.length > 0 && <CartCountToolip>{cart.length}</CartCountToolip>}
      </CartButton>
      <Cart cart={cart} isCartOpen={isCartOpen} toggleCart={toggleCart} clearCart={clearCart} />
    </HeaderWrapper>
  );
};
