import { Product } from '../../common/types/ProductTypes';

export const getFeaturedProduct = (products?: Product[]): Product | undefined => {
  if (!products) {
    return undefined;
  }

  const featuredProduct = products.find((product) => {
    const { featured, details } = product;

    if (!featured || !details) {
      return undefined;
    }

    return product;
  });

  return featuredProduct;
};
