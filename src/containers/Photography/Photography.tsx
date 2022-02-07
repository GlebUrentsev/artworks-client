import React from 'react';
import styled, { css } from 'styled-components';

import { INDENT, adaptive } from '../../common/tokens';
import { ProductsContext } from '../../state/ProductsProvider';
import { getCategories, sortAndFilterProducts } from './utils';
import { TitleWithCategory } from '../../components/TitleWithCategory';
import { SortingControls } from '../../components/SortingControls';
import { PAGINATION_OFFSET } from './constants';
import { useSorting } from './hooks/useSorting';
import { Pagination } from '../../components/Pagination';
import { ProductsGrid } from '../../components/ProductsGrid';
import { useFilters } from './hooks/useFilters';
import { FilterGroup } from '../../components/FilterGroup';
import { PRICE_FILTER_MAP } from '../../common/constants/filters';
import { SORT_VARIANTS } from '../../common/constants/sorting';

const PhotographyContainer = styled.div`
  margin: ${INDENT.xxxl} ${INDENT.none};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilteredProducts = styled.div`
  display: flex;
  margin-top: ${INDENT.xxxl};
`;

const Filters = styled.div`
  width: 268px;

  ${adaptive.maxWidth.desktopS} {
    display: none;
  }
`;

const FilteredContent = styled.div<{ noProducts: boolean }>`
  margin-left: ${INDENT.auto};

  ${({ noProducts }) =>
    noProducts &&
    css`
      width: 100%;
    `}

  ${adaptive.maxWidth.desktopS} {
    margin: ${INDENT.auto};
    width: 100%;
  }
`;

export const Photography = () => {
  const { products } = React.useContext(ProductsContext);
  const uniqueCategories = React.useMemo(() => getCategories(products), [products]);

  const { isAscending, setIsAscending, setSortingVariant, sortingVariant } = useSorting();
  const { priceFilter, multipleFilters, onPriceFilterChange, onMultipleFilterChange } = useFilters();
  const [currentPage, setCurrentPage] = React.useState(1);

  const changedProducts = React.useMemo(
    () =>
      sortAndFilterProducts({
        isAscending,
        sortingVariant,
        products,
        price: priceFilter,
        multipleFilters,
      }),
    [isAscending, products, sortingVariant, multipleFilters, priceFilter],
  );

  const lastIndexToSlice = currentPage * PAGINATION_OFFSET;
  const firstIndexToSlice = lastIndexToSlice - PAGINATION_OFFSET;
  const isEpmptyProducts = changedProducts.length === 0;

  return (
    <PhotographyContainer>
      <TitleWrapper>
        <TitleWithCategory title="Photography" subtitle="Premium Photos" />
        <SortingControls
          onSortChange={setSortingVariant}
          onAscendingChange={setIsAscending}
          sortVariants={SORT_VARIANTS}
          itemsLength={changedProducts.length}
        />
      </TitleWrapper>

      <FilteredProducts>
        <Filters>
          <FilterGroup
            filterName="category"
            title="category"
            variant="multiple"
            uniqueCategories={uniqueCategories}
            onMultipleFilterChange={onMultipleFilterChange}
          />

          <FilterGroup
            variant="single"
            title="price"
            priceFitersMap={PRICE_FILTER_MAP}
            onPriceFilterChange={onPriceFilterChange}
            priceFilter={priceFilter}
          />
        </Filters>

        <FilteredContent noProducts={isEpmptyProducts}>
          <ProductsGrid
            products={changedProducts}
            firstIndexToSlice={firstIndexToSlice}
            lastIndexToSlice={lastIndexToSlice}
          />

          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            paginationOffset={PAGINATION_OFFSET}
            items={changedProducts}
          />
        </FilteredContent>
      </FilteredProducts>
    </PhotographyContainer>
  );
};
