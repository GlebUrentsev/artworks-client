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
import { Spinner } from '../../components/Spinner';
import { useBreakpointState } from '../../common/breakpoints';
import { MobilePanel } from '../../components/MobilePanel';

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
`;

const FilteredContent = styled.div<{ noProducts: boolean }>`
  margin-left: ${INDENT.auto};

  ${({ noProducts }) =>
    noProducts &&
    css`
      width: 100%;
    `}

  ${adaptive.maxWidth.desktopS} {
    margin: ${INDENT.none} ${INDENT.auto};
    width: 100%;
  }
`;

export const Photography = () => {
  const { isMobile, isTablet, isDesktopS, isDesktopM, isDesktopL } = useBreakpointState();
  const [mobilePanelOpen, setMobilePanelOpen] = React.useState(false);
  const { products, isLoading, addToCart } = React.useContext(ProductsContext);
  const uniqueCategories = React.useMemo(() => getCategories(products), [products]);

  const { isAscending, setIsAscending, setSortingVariant, sortingVariant } = useSorting();
  const { priceFilter, multipleFilters, onPriceFilterChange, onMultipleFilterChange, onMultipleFilterClear } =
    useFilters();
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

  if (isLoading) {
    return <Spinner />;
  }

  const renderFiltersOnDesktop = isDesktopS || isDesktopM || isDesktopL;
  const renderFiltersOnMobile = isMobile || isTablet;

  const filters = (
    <Filters>
      <FilterGroup
        filterName="category"
        title="category"
        variant="multiple"
        uniqueCategories={uniqueCategories}
        onMultipleFilterChange={onMultipleFilterChange}
        multipleFilters={multipleFilters}
      />

      <FilterGroup
        variant="single"
        title="price"
        priceFitersMap={PRICE_FILTER_MAP}
        onPriceFilterChange={onPriceFilterChange}
        priceFilter={priceFilter}
      />
    </Filters>
  );

  const handleFilterCancel = () => {
    onPriceFilterChange(undefined);
    onMultipleFilterClear();
    setMobilePanelOpen(false);
  };

  const handleSaveFilters = () => {
    setMobilePanelOpen(false);
  };

  return (
    <PhotographyContainer>
      <TitleWrapper>
        <TitleWithCategory title="Photography" subtitle="Premium Photos" />
        <SortingControls
          onMobilePanelToggle={() => setMobilePanelOpen((prev) => !prev)}
          onSortChange={setSortingVariant}
          onAscendingChange={setIsAscending}
          sortVariants={SORT_VARIANTS}
          itemsLength={changedProducts.length}
        />
      </TitleWrapper>

      <FilteredProducts>
        {renderFiltersOnDesktop && (
          <Filters>
            <FilterGroup
              filterName="category"
              title="category"
              variant="multiple"
              uniqueCategories={uniqueCategories}
              onMultipleFilterChange={onMultipleFilterChange}
              multipleFilters={multipleFilters}
            />

            <FilterGroup
              variant="single"
              title="price"
              priceFitersMap={PRICE_FILTER_MAP}
              onPriceFilterChange={onPriceFilterChange}
              priceFilter={priceFilter}
            />
          </Filters>
        )}

        <FilteredContent noProducts={isEpmptyProducts}>
          <ProductsGrid
            products={changedProducts}
            firstIndexToSlice={firstIndexToSlice}
            lastIndexToSlice={lastIndexToSlice}
            addToCart={addToCart}
          />

          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            paginationOffset={PAGINATION_OFFSET}
            items={changedProducts}
          />
        </FilteredContent>
      </FilteredProducts>
      {renderFiltersOnMobile && (
        <MobilePanel onClear={handleFilterCancel} onSave={handleSaveFilters} isOpen={mobilePanelOpen}>
          {filters}
        </MobilePanel>
      )}
    </PhotographyContainer>
  );
};
