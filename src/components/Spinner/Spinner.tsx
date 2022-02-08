import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

import { COLORS, INDENT } from '../../common/tokens';

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 400px;
  margin: ${INDENT.xxxl};
`;

export const Spinner = () => {
  return (
    <SpinnerWrapper>
      <TailSpin width={200} height={200} color={COLORS.blue} />
    </SpinnerWrapper>
  );
};
