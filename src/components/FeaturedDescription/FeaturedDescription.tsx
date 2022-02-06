import React from 'react';
import styled from 'styled-components';

import { INDENT } from '../../common/tokens/indent';
import { COLORS } from '../../common/tokens/palette';
import { fontSizeL, fontSizeXL } from '../../common/tokens/typography';
import { MainTypography } from '../MainTypography';

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

export const FeaturedDescription = () => {
  return (
    <DescriptionWrapper>
      <MainTypography>About the Samurai King Resting</MainTypography>
      <ProductCaregory>Pets</ProductCaregory>
      <ProductDescription>
        So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely
        scrambled part of Cicero&apos;s De Finibus in order to provide placeholder text to mockup various fonts for a
        type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century
        typesetter likely scrambled part of Cicero&apos;s De Finibus in order to provide placeholder text to mockup
        various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to
        McClintock.
      </ProductDescription>
    </DescriptionWrapper>
  );
};
