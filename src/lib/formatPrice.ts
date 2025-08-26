export function formatPrice(price: number): string {
  return price.toLocaleString('en-US').replace(/^0+/, '') + ' IQD'
}