export const CURRENCY_MAP = {
  USD: '$',
  EUR: '€',
} as const;

type CURRENCY_MAP_KEYS = keyof typeof CURRENCY_MAP;

export const getCurrencyPrice = (value: number, currencyType: string) => {
  const currencySign = CURRENCY_MAP[currencyType as CURRENCY_MAP_KEYS];

  return `${currencySign} ${value}`;
};
