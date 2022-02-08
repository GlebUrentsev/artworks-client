import React from 'react';
import styled from 'styled-components';

import { FeaturedPreview } from '../../components/FeaturedPreview/FeaturedPreview';
import { FeaturedDescription } from '../../components/FeaturedDescription';
import { adaptive, INDENT } from '../../common/tokens';
import { bottomDevider } from '../../common/styled-utils/bottom-devider';
import { FeaturedRecomendation } from '../../components/FeaturedRecomendation';
import { ProductsContext } from '../../state/ProductsProvider';
import { getFeaturedProduct } from './utils';

const ProductContainer = styled.div`
  margin-top: ${INDENT.xxl};
  padding-bottom: ${INDENT.xxxl};
  ${bottomDevider};
`;

const ProductBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${adaptive.maxWidth.desktopS} {
    display: block;
    margin-top: ${INDENT.m};
  }
`;

export const FeaturedProduct = () => {
  const { products, addToCart } = React.useContext(ProductsContext);
  const featuredProduct = React.useMemo(() => getFeaturedProduct(products), [products]);

  if (!featuredProduct) {
    return null;
  }

  const { image, name, details, category, _id: id, price, currency } = featuredProduct;

  return (
    <ProductContainer>
      <FeaturedPreview image={image} name={name} addToCart={addToCart} id={id} price={price} currency={currency} />
      <ProductBottomContainer>
        <FeaturedDescription details={details} name={name} category={category} />
        <FeaturedRecomendation details={details} />
      </ProductBottomContainer>
    </ProductContainer>
  );
};
