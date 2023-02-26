/**
 * Assuming there is no public API yet,
 * I'm hardcoding the exchange rates here
 */
export const CURRENCY_RATE_PER_USD: {[currency: string]: number} = {
  USD: 1,
  EUR: 0.94,
  SGD: 1.35,
  BTC: 0.000043,
};

export const COIN_COLOR_HASH: {[symbol: string]: string} = {
  DASH: 'rgb(0, 140, 227)',
  DFI: 'rgb(255, 0, 175)',
};
