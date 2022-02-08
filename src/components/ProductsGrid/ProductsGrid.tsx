import React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import { adaptive, COLORS, fontSizeXXL, fontSizeXL, INDENT, fontSizeXLX, fontSizeLm } from '../../common/tokens';
import { CartProduct, Product } from '../../common/types/ProductTypes';
import { capitalizeFirstLetter } from '../../common/utils/capitalizeFirstLetter';
import { getCurrencyPrice } from '../../common/utils/getCurrencyPrice';
import { ActionButton } from '../ActionButton';
import { MainTypography } from '../MainTypography';

const FilteredGridCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  ${adaptive.maxWidth.tablet} {
    width: 100%;
    max-width: 420px;
  }
`;

const BestSellerTooltip = styled.div`
  background-color: ${COLORS.white};
  ${fontSizeLm};
  position: absolute;
  left: 0;
  top: 0;
  padding: ${INDENT.xxxxs} ${INDENT.xxs};
`;

const CardActioButton = styled(ActionButton)`
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;

  &:hover {
    display: block;
  }

  ${adaptive.maxWidth.tablet} {
    display: block;
  }
`;

const FilteredGridImage = styled.img`
  max-width: 320px;
  height: 320px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover ~ ${CardActioButton} {
    display: block;
  }

  ${adaptive.maxWidth.tablet} {
    height: unset;
    max-width: none;
  }
`;

const FilteredGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 270px));
  row-gap: 30px;
  column-gap: 30px;
  justify-content: center;
  padding-left: ${INDENT.xl};

  ${adaptive.maxWidth.desktopS} {
    grid-template-columns: repeat(2, minmax(min-content, 270px));
    column-gap: 20px;
    margin: ${INDENT.auto};
    padding-left: ${INDENT.none};
  }

  ${adaptive.maxWidth.tablet} {
    grid-template-columns: 1fr;
    width: 100%;
    padding-left: ${INDENT.none};
    column-gap: 0;
    align-items: center;
    justify-items: center;
  }
`;

const Category = styled.span`
  display: inline-block;
  color: ${COLORS.gray};
  font-size: ${fontSizeXL};
  margin-top: ${INDENT.xxxs};
  font-weight: 700;
`;

const NameTitle = styled(MainTypography)`
  ${fontSizeXXL};
  font-weight: 700;
  margin: ${INDENT.xxxs} ${INDENT.none};
`;

const PriceLabel = styled.span`
  display: inline-block;
  ${fontSizeXLX}
`;

const EmptyProducts = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

type ProductsGridProps = {
  products: Product[];
  lastIndexToSlice: number;
  firstIndexToSlice: number;
  addToCart: (product: CartProduct) => void;
};

export const ProductsGrid = ({ products, lastIndexToSlice, firstIndexToSlice, addToCart }: ProductsGridProps) => {
  if (products.length === 0) {
    return <EmptyProducts>No products</EmptyProducts>;
  }

  const slicedProducts = products.slice(firstIndexToSlice, lastIndexToSlice);

  return (
    <FilteredGrid>
      {slicedProducts.map(({ _id, image, price, name, category, currency, bestseller }) => (
        <LazyLoad key={image?.src}>
          <FilteredGridCard>
            <FilteredGridImage src={image?.src} />
            {bestseller && <BestSellerTooltip>Best Seller</BestSellerTooltip>}
            <CardActioButton
              onClick={() =>
                addToCart({
                  _id,
                  image,
                  price,
                  name,
                  currency,
                })
              }
            >
              Add to cart
            </CardActioButton>
          </FilteredGridCard>

          <Category>{capitalizeFirstLetter(category)}</Category>
          <NameTitle>{name}</NameTitle>
          <PriceLabel>{getCurrencyPrice(price, currency)}</PriceLabel>
        </LazyLoad>
      ))}
    </FilteredGrid>
  );
};
