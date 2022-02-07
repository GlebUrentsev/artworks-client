import React from 'react';
import { PriceFilter } from '../../../common/types/FilterTypes';

export const useFilters = () => {
  const [multipleFilters, setMultipleFilters] = React.useState<Record<string, string[]>>({});
  const [priceFilter, setPriceFilter] = React.useState<PriceFilter | undefined>();

  const handleMultipleFilterChange = (category: string, filterToApply: string) => {
    setMultipleFilters((prevFilters) => {
      const prevFiltersByCategory = prevFilters?.[category] ?? [];

      if (!prevFiltersByCategory) {
        return { ...prevFilters };
      }

      // TODO - think how to avoid two if's
      if (prevFiltersByCategory.includes(filterToApply)) {
        const filteredCategiries = prevFiltersByCategory.filter((categoryPrev) => categoryPrev !== filterToApply);

        if (filteredCategiries.length === 0) {
          const copiedFilters = { ...prevFilters };
          delete copiedFilters[category];

          return {
            ...copiedFilters,
          };
        }

        return {
          ...prevFilters,
          [category]: [...filteredCategiries],
        };
      }

      return {
        ...prevFilters,
        [category]: [...prevFiltersByCategory, filterToApply],
      };
    });
  };

  return {
    multipleFilters,
    priceFilter,
    onPriceFilterChange: setPriceFilter,
    onMultipleFilterChange: handleMultipleFilterChange,
  };
};
