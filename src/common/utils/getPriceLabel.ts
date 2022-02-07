import { PriceFilter } from '../types/FilterTypes';

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
