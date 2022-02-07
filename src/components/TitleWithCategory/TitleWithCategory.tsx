import React from 'react';
import styled from 'styled-components';

import { INDENT, COLORS, adaptive, fontSizeL } from '../../common/tokens';
import { MainTypography } from '../MainTypography';

const Title = styled(MainTypography)`
  display: flex;
  align-items: center;
  font-size: 30px;

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
`;

const TitleSubCategory = styled(Title)`
  color: ${COLORS.softGray};
  margin-left: ${INDENT.xxxs};

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
`;

const TitleWithCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type TitleWithCategoryProps = {
  title: string;
  subtitle: string;
};

export const TitleWithCategory = ({ title, subtitle }: TitleWithCategoryProps) => {
  return (
    <TitleWithCategoryWrapper>
      <Title>{title} /</Title>
      <TitleSubCategory>{subtitle}</TitleSubCategory>
    </TitleWithCategoryWrapper>
  );
};
