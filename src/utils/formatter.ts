export const roundNumber = (num: number) => Math.round(num * 100) / 100;

export const formatPrice = (num: number) => {
  const parts = num.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
