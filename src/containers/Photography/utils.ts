import { Product } from '../../common/types/ProductTypes';

export const getCategories = (products?: Product[]): string[] | undefined => {
  if (!products) {
    return undefined;
  }

  const categories = products.map((product) => product.category);

  return Array.from(new Set(categories));
};

const sortVariants = {
  byPrice: 'Price',
  alphabetically: 'Alphabetically',
};

type SortVariantsKeys = keyof typeof sortVariants;

export const getSortedProducts = (
  isAscending: boolean,
  sortingVariant: SortVariantsKeys | null,
  products: Product[] | undefined,
) => {
  if (!products) {
    return undefined;
  }

  if (!sortingVariant) {
    return products;
  }

  if (sortingVariant === 'byPrice') {
    return isAscending ? products.sort((a, b) => a.price - b.price) : products.sort((a, b) => b.price - a.price);
  }

  if (sortingVariant === 'alphabetically') {
    return isAscending
      ? products.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      : products.sort((a, b) => {
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
