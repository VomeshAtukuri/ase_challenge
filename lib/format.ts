export function formatCurrency(value: number, locale = "en-US", currency = "INR") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value)
}
