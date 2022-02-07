import { PriceFilter } from '../../common/types/FilterTypes';
import { Product } from '../../common/types/ProductTypes';

export const getCategories = (products: Product[]): string[] => {
  const categories = products.map((product) => product.category);

  return Array.from(new Set(categories));
};

const sortVariants = {
  byPrice: 'Price',
  alphabetically: 'Alphabetically',
};

type SortVariantsKeys = keyof typeof sortVariants;

const getSortedProducts = (
  isAscending: boolean,
  sortingVariant: SortVariantsKeys | null,
  products: Product[],
): Product[] => {
  const copiedProducts = [...products];

  if (sortingVariant === 'byPrice') {
    return isAscending
      ? copiedProducts.sort((a, b) => a.price - b.price)
      : copiedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortingVariant === 'alphabetically') {
    return isAscending
      ? copiedProducts.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      : copiedProducts.sort((a, b) => {
          if (b.name < a.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
  }

  return products;
};

const getOnlyFilteredProducts = (products: Product[]) => {
  return products.filter((product) => !product.featured);
};

const getPriceFilter = (price: PriceFilter, products: Product[]) => {
  const { filterType, value } = price;

  if ((filterType === 'low_middle' || filterType === 'high_middle') && Array.isArray(value)) {
    const [from, to] = value;
    return products.filter((product) => product.price >= Number(from) && product.price <= Number(to));
  }

  if (filterType === 'low') {
    return products.filter((product) => product.price <= Number(value));
  }

  return products.filter((product) => product.price >= Number(value));
};

export const sortAndFilterProducts = ({
  products,
  sortingVariant,
  isAscending,
  multipleFilters,
  price,
}: {
  products: Product[];
  sortingVariant: SortVariantsKeys | null;
  isAscending: boolean;
  multipleFilters?: Record<string, string[]>;
  price?: PriceFilter;
}) => {
  let finalProducts = getOnlyFilteredProducts(products).sort((a, b) => {
    // bestsellers first
    if (a.bestseller === b.bestseller) {
      return 0;
    }

    return a.bestseller ? -1 : 1;
  });

  if (sortingVariant) {
    finalProducts = [...getSortedProducts(isAscending, sortingVariant, finalProducts)];
  }

  if (multipleFilters) {
    finalProducts = [
      ...finalProducts.filter((finalProduct) =>
        Object.keys(multipleFilters).every((filterKey) =>
          multipleFilters[filterKey].some((filter: string) => finalProduct.category === filter),
        ),
      ),
    ];
  }

  if (price) {
    finalProducts = [...getPriceFilter(price, finalProducts)];
  }

  return finalProducts;
};

export const getPriceLabel = (price: PriceFilter) => {
  const { filterType, value } = price;

  switch (filterType) {
    case 'low':
      return `Lower than $${value}`;

    case 'low_middle':
    case 'high_middle':
      return `$${value[0]} - $${value[1]}`;

    case 'high':
      return `More than $${value}`;

    default:
      return '';
  }
};
