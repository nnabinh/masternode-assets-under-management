export interface QuoteLatest {
  id: string;
  symbol: string;
  name: string;
  quote: {
    USD: {
      price: number;
    };
  };
}
