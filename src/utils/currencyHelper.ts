type CurrencyHelperData = {
  locale: string
  value: number
  currencyStyle: 'BRL' | 'USD'
}

export function currencyHelper({
  locale,
  value,
  currencyStyle
}: CurrencyHelperData) {
  const currency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyStyle
  }).format(value)

  return currency
}
