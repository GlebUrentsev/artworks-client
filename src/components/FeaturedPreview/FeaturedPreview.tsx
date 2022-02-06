import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import { INDENT } from '../../common/tokens/indent';
import { COLORS } from '../../common/tokens/palette';

import { adaptive } from '../../common/tokens/screen';
import { fontSizeLm, fontSizeXXL, fontSizeS } from '../../common/tokens/typography';
import { ActionButton } from '../ActionButton';
import { MainTypography, TYPOGRAPHY_TAGS } from '../MainTypography';
import dogPic from './dog-pic.webp';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeaturedTitle = styled(MainTypography)`
  ${fontSizeXXL};
`;

const DesktopButton = styled(ActionButton)`
  ${adaptive.maxWidth.tablet} {
    display: none;
  }
`;

const MobileButton = styled(ActionButton)`
  display: none;

  ${adaptive.maxWidth.tablet} {
    display: block;
    width: 100%;
  }
`;

const PreviewWrapper = styled.div`
  margin: ${INDENT.sm} ${INDENT.none} ${INDENT.l} ${INDENT.none};
  position: relative;

  ${adaptive.maxWidth.tablet} {
    margin: ${INDENT.sm} ${INDENT.none} ${INDENT.m} ${INDENT.none};
  }
`;

const FeaturedPreviewImage = styled.img`
  max-width: 100%;
  width: 100%;
  min-height: 280px;
`;

const PreviewTooltip = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${COLORS.white};
  ${fontSizeLm};
  padding: ${INDENT.s} ${INDENT.xs};
  font-weight: bold;

  ${adaptive.maxWidth.tablet} {
    ${fontSizeS};
    padding: ${INDENT.s} ${INDENT.l};
  }
`;

const LAZY_LOAD_HEIGHT = 500;

export const FeaturedPreview = () => {
  return (
    <>
      <TitleWrapper>
        <FeaturedTitle as={TYPOGRAPHY_TAGS.h1}>Samurai King Resting</FeaturedTitle>
        <DesktopButton upperCase onClick={() => alert('added to cart')}>
          Add to cart
        </DesktopButton>
      </TitleWrapper>

      <PreviewWrapper>
        <LazyLoad height={LAZY_LOAD_HEIGHT}>
          <FeaturedPreviewImage src={dogPic} alt="Dog" />
        </LazyLoad>
        <PreviewTooltip>Photo of the day</PreviewTooltip>
      </PreviewWrapper>
      <MobileButton upperCase onClick={() => alert('added to cart')}>
        Add to cart
      </MobileButton>
    </>
  );
};
