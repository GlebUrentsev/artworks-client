import React from 'react';
import styled from 'styled-components';

import { INDENT } from '../../common/tokens/indent';
import { COLORS } from '../../common/tokens/palette';
import { fontSizeL, fontSizeXL } from '../../common/tokens/typography';
import { FeaturedProductDetails } from '../../common/types/ProductTypes';
import { MainTypography } from '../MainTypography';
import { locale } from './locales';
import { capitalizeFirstLetter } from '../../common/utils/capitalizeFirstLetter';

const DescriptionWrapper = styled.div`
  flex-basis: 55%;
`;

const ProductCaregory = styled.p`
  ${fontSizeXL};
  color: ${COLORS.gray};
  margin: ${INDENT.xxxs} ${INDENT.none} ${INDENT.xxs} ${INDENT.none};
`;

const ProductDescription = styled.p`
  ${fontSizeL};
  line-height: 27px;
  color: ${COLORS.gray};
`;

type FeaturedDescriptionProps = {
  details?: FeaturedProductDetails;
  name: string;
  category: string;
};

export const FeaturedDescription = ({ details, name, category }: FeaturedDescriptionProps) => {
  const description = details?.description;

  return (
    <DescriptionWrapper>
      <MainTypography>
        {locale.about} {capitalizeFirstLetter(name)}
      </MainTypography>
      <ProductCaregory>{category}</ProductCaregory>
      {description && <ProductDescription>{description}</ProductDescription>}
    </DescriptionWrapper>
  );
};
