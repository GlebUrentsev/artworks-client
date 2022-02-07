import React from 'react';
import styled from 'styled-components';

import { INDENT, fontSizeXL, COLORS } from '../../common/tokens';
import { capitalizeFirstLetter } from '../../common/utils/capitalizeFirstLetter';

const FilterComponent = styled.div`
  margin-bottom: ${INDENT.l};

  &:last-child {
    margin-bottom: ${INDENT.none};
  }
`;

export const FilterLabel = styled.label`
  ${fontSizeXL};
  color: ${COLORS.dark};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

type FilterProps = {
  uniqueCategory: string;
  labelText: string;
};

export const Filter = ({ children, uniqueCategory, labelText }: React.PropsWithChildren<FilterProps>) => {
  return (
    <FilterComponent>
      {children}
      <FilterLabel htmlFor={uniqueCategory}>{capitalizeFirstLetter(labelText)}</FilterLabel>
    </FilterComponent>
  );
};
