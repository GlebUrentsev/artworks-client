import React from 'react';
import styled from 'styled-components';

import { Close } from '../../common/assets';
import { bottomDevider } from '../../common/styled-utils/bottom-devider';
import { adaptive, COLORS, fontSizeLm, fontSizeXL, fontSizeXLX, INDENT } from '../../common/tokens';
import { CartProduct } from '../../common/types/ProductTypes';
import { capitalizeFirstLetter } from '../../common/utils/capitalizeFirstLetter';
import { getCurrencyPrice } from '../../common/utils/getCurrencyPrice';
import { MainTypography } from '../MainTypography';

const CART_TOP_INDENT = 102;
const CART_TOP_INDENT_MOBILE = 70;

const CartWrapper = styled.div`
  position: absolute;
  padding: ${INDENT.sm} ${INDENT.s};
  background: ${COLORS.white};
  right: 0;
  top: ${CART_TOP_INDENT}px;
  z-index: 3;
  width: 443px;
  border: 4px solid ${COLORS.light};

  ${adaptive.maxWidth.tablet} {
    top: ${CART_TOP_INDENT_MOBILE}px;
    right: 0;
    width: 100%;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20px;
`;

const CartItemsWrapper = styled.div`
  margin-top: ${INDENT.sm};
  padding-bottom: ${INDENT.sm};
  ${bottomDevider};
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${INDENT.sm};
`;

const CartInfo = styled.div`
  flex-basis: 50%;
`;

const CartPicture = styled.img`
  flex-basis: 50%;
  max-width: 150px;
  max-height: 90px;
  object-fit: cover;
`;

const CartItemTitle = styled(MainTypography)`
  ${fontSizeLm};
`;

const CartPrice = styled.span`
  ${fontSizeXLX};
  color: ${COLORS.gray};
  text-transform: uppercase;
  margin-top: ${INDENT.xxxs};
`;

const ClearButton = styled.div`
  padding: ${INDENT.xs};
  background: transparent;
  border: 3px solid ${COLORS.black};
  width: 100%;
  margin-top: ${INDENT.sm};
  cursor: pointer;
  text-transform: uppercase;
  ${fontSizeXL};
`;

type CartProps = {
  isCartOpen: boolean;
  cart: CartProduct[];
  toggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  clearCart: () => void;
};

export const Cart = ({ isCartOpen, cart, clearCart, toggleCart }: CartProps) => {
  if (!isCartOpen || cart.length === 0) {
    return null;
  }

  return (
    <CartWrapper>
      <CartHeader>
        <Close onClick={() => toggleCart(false)} />
      </CartHeader>
      <CartItemsWrapper>
        {cart.map(({ _id: id, image, name, price, currency }, index) => (
          <CartItem key={`${id}_${name}_${index}`}>
            <CartInfo>
              <CartItemTitle>{capitalizeFirstLetter(name)}</CartItemTitle>
              <CartPrice>{getCurrencyPrice(price, currency)}</CartPrice>
            </CartInfo>
            <CartPicture src={image?.src} alt={image?.alt} />
          </CartItem>
        ))}
      </CartItemsWrapper>
      <ClearButton onClick={clearCart}>Clear</ClearButton>
    </CartWrapper>
  );
};
