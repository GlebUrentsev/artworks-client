import { PRICE_FILTER_MAP } from '../constants/filters';

export type PRICE_FILTER_KEY = keyof typeof PRICE_FILTER_MAP;

export type PriceFiltersKeys = keyof typeof PRICE_FILTER_MAP;

export type PriceFilter = {
  filterType: PriceFiltersKeys;
  value: string | string[];
};
