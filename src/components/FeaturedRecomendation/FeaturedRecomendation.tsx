import React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import { INDENT } from '../../common/tokens/indent';
import { COLORS } from '../../common/tokens/palette';
import { adaptive } from '../../common/tokens/screen';
import { fontSizeM } from '../../common/tokens/typography';
import { FeaturedProductDetails } from '../../common/types/ProductTypes';
import { locale } from './locales';
import { MainTypography } from '../MainTypography';

const RecommendationsContainer = styled.div`
  flex-basis: 40%;
  padding-left: ${INDENT.l};
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${adaptive.maxWidth.desktopS} {
    display: block;
    padding-left: ${INDENT.none};
    margin-top: ${INDENT.m};
  }
`;

const RecommendationsPreviews = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 117px));
  column-gap: 30px;
  margin: ${INDENT.sm} ${INDENT.none} ${INDENT.xxl} ${INDENT.none};
  color: ${COLORS.gray};
  row-gap: 30px;

  ${adaptive.maxWidth.tablet} {
    grid-template-columns: repeat(3, 100px);
    column-gap: 20px;
  }

  ${adaptive.maxWidth.customMobile} {
    grid-template-columns: repeat(2, 100px);
  }
`;

const RecommendationPreview = styled.img`
  width: 117px;
  height: 147px;
  object-fit: cover;

  ${adaptive.maxWidth.tablet} {
    width: 100px;
  }
`;

const DetailsInfo = styled.p`
  ${fontSizeM};
  margin: ${INDENT.xxxs} ${INDENT.none};
`;

type FeaturedRecomendationProps = {
  details?: FeaturedProductDetails;
};

export const FeaturedRecomendation = ({ details }: FeaturedRecomendationProps) => {
  if (!details) {
    return null;
  }

  const { recommendations, dimentions, size } = details;
  const hasRecommendations = recommendations && recommendations.length > 0;

  const detailsBlock = () => {
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

  return (
    <RecommendationsContainer>
      {hasRecommendations && (
        <>
          <MainTypography>{locale.recomendationText}</MainTypography>
          <RecommendationsPreviews>
            {recommendations?.map((recomendation) => (
              <LazyLoad key={`${recomendation.alt}_${recomendation.src}`}>
                <RecommendationPreview src={recomendation.src} alt={recomendation.alt} />
              </LazyLoad>
            ))}
          </RecommendationsPreviews>
        </>
      )}

      {detailsBlock()}
    </RecommendationsContainer>
  );
};
