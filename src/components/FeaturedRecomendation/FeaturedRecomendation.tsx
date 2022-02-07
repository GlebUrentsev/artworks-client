import React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import { INDENT, COLORS, adaptive } from '../../common/tokens';
import { FeaturedProductDetails } from '../../common/types/ProductTypes';
import { locale } from './locales';
import { MainTypography } from '../MainTypography';
import { Details } from './Details';

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

type FeaturedRecomendationProps = {
  details?: FeaturedProductDetails;
};

export const FeaturedRecomendation = ({ details }: FeaturedRecomendationProps) => {
  if (!details) {
    return null;
  }

  const { recommendations, dimentions, size } = details;
  const hasRecommendations = recommendations && recommendations.length > 0;

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

      <Details dimentions={dimentions} size={size} />
    </RecommendationsContainer>
  );
};
