import React from 'react';
import styled from 'styled-components';

import { FeaturedPreview } from '../../components/FeaturedPreview/FeaturedPreview';
import { FeaturedDescription } from '../../components/FeaturedDescription';
import { adaptive } from '../../common/tokens/screen';
import { INDENT } from '../../common/tokens/indent';
import { bottomDevider } from '../../styled-utils/bottom-devider';
import { FeaturedRecomendation } from '../../components/FeaturedRecomendation';
import { ProductsContext } from '../../state/ProductsProvider';

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
  const { data, isLoading, setSt } = React.useContext(ProductsContext);
  console.log(data, isLoading);
  return (
    <ProductContainer>
      <button type="button" onClick={() => setSt?.((prev) => !prev)}>
        123
      </button>
      <FeaturedPreview />
      <ProductBottomContainer>
        <FeaturedDescription />
        <FeaturedRecomendation />
      </ProductBottomContainer>
    </ProductContainer>
  );
};
