import React from 'react';
import styled from 'styled-components';

import { INDENT, fontSizeM } from '../../common/tokens';
import { MainTypography } from '../MainTypography';
import { locale } from './locales';

const DetailsInfo = styled.p`
  ${fontSizeM};
  margin: ${INDENT.xxxs} ${INDENT.none};
`;

type DetailsProps = {
  dimentions?: {
    width: number;
    height: number;
  };
  size?: number;
};

export const Details = ({ dimentions, size }: DetailsProps) => {
  if (!dimentions) {
    return null;
  }

  const { width, height } = dimentions;

  return (
    <>
      <MainTypography>{locale.details}</MainTypography>
      <DetailsInfo>
        {locale.size}: {height} x {width} {locale.pixel}
      </DetailsInfo>
      {size && (
        <DetailsInfo>
          {locale.size}: {Math.ceil(size / 1000)} mb
        </DetailsInfo>
      )}
    </>
  );
};
