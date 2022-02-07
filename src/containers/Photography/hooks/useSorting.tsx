import React from 'react';

import { SortVariantsKeys } from '../../../common/types/Sorting';

export const useSorting = () => {
  const [sortingVariant, setSortingVariant] = React.useState<SortVariantsKeys | null>(null);
  const [isAscending, setIsAscending] = React.useState(true);

  return {
    sortingVariant,
    isAscending,
    setSortingVariant,
    setIsAscending,
  };
};
