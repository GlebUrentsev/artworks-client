import React from 'react';
import styled from 'styled-components';

import { bottomDevider } from '../../common/styled-utils/bottom-devider';
import { INDENT } from '../../common/tokens';
import { PriceFilter, PRICE_FILTER_KEY } from '../../common/types/FilterTypes';
import { capitalizeFirstLetter } from '../../common/utils/capitalizeFirstLetter';
import { getPriceLabel } from '../../common/utils/getPriceLabel';
import { Filter, FilterCheckBox } from '../Filter';
import { MainTypography } from '../MainTypography';

const FilterGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    padding-bottom: ${INDENT.xl};
    margin-bottom: ${INDENT.l};
    ${bottomDevider};
  }
`;

const FiltersWrapper = styled.div`
  margin-top: ${INDENT.l};
`;

type MultipleProps = {
  variant: 'multiple';
  uniqueCategories: string[];
  filterName: string;
  onMultipleFilterChange: (category: string, filterToApply: string) => void;
};

type SingleProps = {
  variant: 'single';
  priceFilter?: PriceFilter;
  onPriceFilterChange: React.Dispatch<React.SetStateAction<PriceFilter | undefined>>;
  priceFitersMap: Record<string, string | string[]>;
};

type FilterCommonProps = {
  title: string;
};

type FilterVariantProps = MultipleProps | SingleProps;

type FilterProps = FilterCommonProps & FilterVariantProps;

// TODO-refactor on different components
export const FilterGroup = (props: React.PropsWithChildren<FilterProps>) => {
  const { title } = props;

  // for Discriminating Unions
  if (props.variant === 'multiple') {
    return (
      <FilterGroupWrapper>
        <MainTypography>{capitalizeFirstLetter(props.title)}</MainTypography>
        <FiltersWrapper>
          {props.uniqueCategories.map((uniqueCategory) => (
            <Filter uniqueCategory={uniqueCategory} key={uniqueCategory} labelText={uniqueCategory}>
              <FilterCheckBox
                type="checkbox"
                id={uniqueCategory}
                name={capitalizeFirstLetter(uniqueCategory)}
                onChange={() => {
                  props.onMultipleFilterChange(props.filterName, uniqueCategory);
                }}
              />
            </Filter>
          ))}
        </FiltersWrapper>
      </FilterGroupWrapper>
    );
  }

  const { priceFitersMap, onPriceFilterChange, priceFilter } = props;

  return (
    <FilterGroupWrapper>
      <MainTypography>{capitalizeFirstLetter(title)}</MainTypography>
      <FiltersWrapper>
        {Object.entries(priceFitersMap).map(([priceVariantKey, priceVariantValue]) => (
          <Filter
            uniqueCategory={priceVariantKey}
            key={priceVariantKey}
            labelText={getPriceLabel({
              filterType: priceVariantKey as PRICE_FILTER_KEY,
              value: priceVariantValue,
            })}
          >
            <FilterCheckBox
              value={priceVariantValue}
              name="price"
              type="radio"
              id={priceVariantKey}
              checked={priceFilter?.filterType === priceVariantKey}
              onChange={() =>
                onPriceFilterChange({
                  filterType: priceVariantKey as PRICE_FILTER_KEY,
                  value: priceVariantValue,
                })
              }
            />
          </Filter>
        ))}
      </FiltersWrapper>
    </FilterGroupWrapper>
  );
};
