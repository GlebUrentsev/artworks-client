import React from 'react';
import styled from 'styled-components';

import { SortArrows } from '../../common/assets';
import { COLORS, INDENT, adaptive, fontSizeL, fontSizeXL } from '../../common/tokens';
import { SortVariantsKeys } from '../../common/types/Sorting';
import { MainTypography } from '../MainTypography';

const SortingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SortingLabel = styled(MainTypography)`
  color: ${COLORS.softGray};
  font-weight: normal;
  margin: ${INDENT.none} ${INDENT.xs} ${INDENT.none} ${INDENT.xxxs};

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
`;

const SortingSelect = styled.select`
  border: none;
  background: transparent;
  outline: none;
  ${fontSizeXL};
  overflow: hidden;
  width: 120px;
  padding-right: ${INDENT.xxs};
  cursor: pointer;

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
`;

const SortButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;

  &:hover path {
    fill: ${COLORS.blue};
  }
`;

type SortingControlsProps = {
  onSortChange: React.Dispatch<React.SetStateAction<'byPrice' | 'alphabetically' | null>>;
  onAscendingChange: React.Dispatch<React.SetStateAction<boolean>>;
  sortVariants: Record<string, string>;
  itemsLength: number;
};

const DEFAULT_SELECT_VALUE = 'none';

export const SortingControls = ({
  onSortChange,
  onAscendingChange,
  sortVariants,
  itemsLength,
}: SortingControlsProps) => {
  if (itemsLength === 0) {
    return null;
  }

  return (
    <SortingWrapper>
      <SortButton onClick={() => onAscendingChange((prevIsAscending) => !prevIsAscending)}>
        <SortArrows />
      </SortButton>
      <SortingLabel>Sort By</SortingLabel>
      <SortingSelect
        onChange={(e) => onSortChange(e.target.value as SortVariantsKeys)}
        defaultValue={DEFAULT_SELECT_VALUE}
      >
        <option value={DEFAULT_SELECT_VALUE} disabled>
          Select...
        </option>
        {Object.entries(sortVariants).map(([sortVariantKey, sortVariantValue]) => (
          <option value={sortVariantKey} key={sortVariantKey}>
            {sortVariantValue}
          </option>
        ))}
      </SortingSelect>
    </SortingWrapper>
  );
};
