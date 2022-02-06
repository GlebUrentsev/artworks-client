import React from 'react';
import styled from 'styled-components';
import { fontSizeXL } from '../../common/tokens/typography';

const Typography = styled.h1`
  ${fontSizeXL};
`;

export const TYPOGRAPHY_TAGS = {
  span: 'span',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const;

type TYPOGRAPHY_TAG_KEYS = keyof typeof TYPOGRAPHY_TAGS;

type MainTypographyProps = {
  tag?: TYPOGRAPHY_TAG_KEYS;
  className?: string;
};

export const MainTypography = ({
  children,
  tag = TYPOGRAPHY_TAGS.h2,
  className,
}: React.PropsWithChildren<MainTypographyProps>) => {
  return (
    <Typography as={tag} className={className}>
      {children}
    </Typography>
  );
};
