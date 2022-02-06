import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import { INDENT } from '../../common/tokens/indent';
import { COLORS } from '../../common/tokens/palette';
import { fontSizeL, fontSizeXL } from '../../common/tokens/typography';
import { MainTypography } from '../../components/MainTypography';
import { bottomDevider } from '../../styled-utils/bottom-devider';
import { CheckMark, SortArrows } from '../../common/assets';
import { adaptive } from '../../common/tokens/screen';
import { ProductsContext } from '../../state/ProductsProvider';
import { getCategories, getSortedProducts } from './utils';
import { capitalizeFirstLetter } from '../../common/utils/capitalizeFirstLetter';

const PhotographyContainer = styled.div`
  margin: ${INDENT.xxxl} ${INDENT.none};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(MainTypography)`
  display: flex;
  align-items: center;
  font-size: 30px;

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
`;

const TitleSubCategory = styled(Title)`
  color: ${COLORS.softGray};
  margin-left: ${INDENT.xxxs};

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
`;

const TitleWithCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  width: 100px;
  padding-right: ${INDENT.xxs};
  cursor: pointer;

  ${adaptive.maxWidth.tablet} {
    ${fontSizeL};
  }
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

const FilteredContent = styled.div`
  margin-left: ${INDENT.auto};

  ${adaptive.maxWidth.desktopS} {
    margin: ${INDENT.auto};
    width: 100%;
  }
`;

const FilteredGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, 270px));
  row-gap: 30px;
  column-gap: 30px;
  justify-content: center;
  padding-left: ${INDENT.xl};

  ${adaptive.maxWidth.desktopS} {
    grid-template-columns: repeat(2, minmax(min-content, 270px));
    column-gap: 20px;
    margin: ${INDENT.auto};
    padding-left: ${INDENT.none};
  }

  ${adaptive.maxWidth.tablet} {
    grid-template-columns: 1fr;
    width: 100%;
    padding-left: ${INDENT.none};
    column-gap: 0;
    align-items: center;
    justify-items: center;
  }
`;

const FilteredGridImage = styled.img`
  display: block;
  max-width: 320px;
  height: 320px;
  width: 100%;
  object-fit: cover;

  ${adaptive.maxWidth.tablet} {
    width: 100%;
    max-width: 420px;
  }
`;

const FilterGroup = styled.div`
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

const Filter = styled.div`
  margin-bottom: ${INDENT.l};

  &:last-child {
    margin-bottom: ${INDENT.none};
  }
`;

const FilterLabel = styled.label`
  ${fontSizeXL};
  color: ${COLORS.dark};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FilterCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  z-index: -1;
  opacity: 0;
  appearance: none;
  width: 23px;
  height: 23px;

  & + ${FilterLabel}::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
  }

  &:checked + ${FilterLabel}::before {
    background-image: ${`url(${CheckMark})`};
  }
`;

const sortVariants = {
  byPrice: 'Price',
  alphabetically: 'Alphabetically',
};

type SortVariantsKeys = keyof typeof sortVariants;

const paginationOffset = 6;

export const Photography = () => {
  const { products } = React.useContext(ProductsContext);
  const uniqueCategories = React.useMemo(() => getCategories(products), [products]);
  const [sortingVarian, setSortingVarian] = React.useState<SortVariantsKeys | null>(null);
  const [isAscending, setIsAscending] = React.useState(true);
  const withSortingProducts = React.useMemo(
    () => (sortingVarian ? getSortedProducts(isAscending, sortingVarian, products) : products),
    [products, sortingVarian, isAscending],
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const filterCategories = () => {
    if (!uniqueCategories) {
      return null;
    }

    if (uniqueCategories.length > 0) {
      return (
        <FilterGroup>
          <MainTypography>Category</MainTypography>
          <FiltersWrapper>
            {uniqueCategories.map((uniqueCategory) => (
              <Filter key={uniqueCategory}>
                <FilterCheckBox id={uniqueCategory} name={capitalizeFirstLetter(uniqueCategory)} />
                <FilterLabel htmlFor={uniqueCategory}>{capitalizeFirstLetter(uniqueCategory)}</FilterLabel>
              </Filter>
            ))}
          </FiltersWrapper>
        </FilterGroup>
      );
    }

    return null;
  };

  const renderProducts = () => {
    if (!withSortingProducts) {
      return <div>No products</div>;
    }

    const lastIndex = currentPage * paginationOffset;
    const firstIndex = lastIndex - paginationOffset;

    if (withSortingProducts.length > 0) {
      return withSortingProducts.slice(firstIndex, lastIndex).map(({ image, price, name }) => (
        <LazyLoad key={image?.src}>
          {price}
          {name}
          <FilteredGridImage src={image?.src} />
        </LazyLoad>
      ));
    }

    return <div>No products</div>;
  };

  console.log('render');
  return (
    <PhotographyContainer>
      <TitleWrapper>
        <TitleWithCategory>
          <Title>Photography /</Title>
          <TitleSubCategory>Premium Photos</TitleSubCategory>
        </TitleWithCategory>
        <SortingWrapper>
          <SortArrows onClick={() => setIsAscending((prevIsAscending) => !prevIsAscending)} />
          <SortingLabel>Sort By</SortingLabel>
          <SortingSelect onChange={(e) => setSortingVarian(e.target.value as SortVariantsKeys)} defaultValue="none">
            <option value="none" disabled>
              Select...
            </option>
            {Object.entries(sortVariants).map(([sortVariantKey, sortVariantValue]) => (
              <option value={sortVariantKey} key={sortVariantKey}>
                {sortVariantValue}
              </option>
            ))}
          </SortingSelect>
        </SortingWrapper>
      </TitleWrapper>

      <FilteredProducts>
        <Filters>
          {filterCategories()}

          <FilterGroup>
            <MainTypography>Price range</MainTypography>
            <FiltersWrapper>
              <Filter>
                <FilterCheckBox id="low_price" name="low_price" />
                <FilterLabel htmlFor="low_price">Lower than $20</FilterLabel>
              </Filter>
              <Filter>
                <FilterCheckBox id="low_middle" name="low_middle" />
                <FilterLabel htmlFor="low_middle">$20 - $100</FilterLabel>
              </Filter>
              <Filter>
                <FilterCheckBox id="high_middle" name="high_middle" />
                <FilterLabel htmlFor="high_middle">$100 - $200</FilterLabel>
              </Filter>
              <Filter>
                <FilterCheckBox id="high" name="high" />
                <FilterLabel htmlFor="high">More than $200</FilterLabel>
              </Filter>
            </FiltersWrapper>
          </FilterGroup>
        </Filters>

        <FilteredContent>
          <FilteredGrid>{renderProducts()}</FilteredGrid>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: '40px',
              margin: '10px 0',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              style={{ padding: '20px' }}
            >
              Prev
            </button>
            {currentPage}
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === Math.ceil((withSortingProducts?.length as number) / 6)}
              style={{ padding: '20px' }}
            >
              Next
            </button>
          </div>
        </FilteredContent>
      </FilteredProducts>
    </PhotographyContainer>
  );
};
