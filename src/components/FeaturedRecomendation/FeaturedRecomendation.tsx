import React from 'react';
import styled from 'styled-components';
import { INDENT } from '../../common/tokens/indent';
import { COLORS } from '../../common/tokens/palette';
import { adaptive } from '../../common/tokens/screen';
import { fontSizeM } from '../../common/tokens/typography';
import { MainTypography } from '../MainTypography';
import recomend from './recomend.png';

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
  ${adaptive.maxWidth.tablet} {
    width: 100px;
  }
`;

const DetailsInfo = styled.p`
  ${fontSizeM};
  margin: ${INDENT.xxxs} ${INDENT.none};
`;

export const FeaturedRecomendation = () => {
  return (
    <RecommendationsContainer>
      <MainTypography>People also buy</MainTypography>
      <RecommendationsPreviews>
        <RecommendationPreview src={recomend} alt="Recomend" />
        <RecommendationPreview src={recomend} alt="Recomend" />
        <RecommendationPreview src={recomend} alt="Recomend" />
      </RecommendationsPreviews>
      <MainTypography>Details</MainTypography>
      <DetailsInfo>Size: 1020 x 1020 pixel</DetailsInfo>
      <DetailsInfo>Size: 15 mb</DetailsInfo>
    </RecommendationsContainer>
  );
};
