export interface AmountFormatOptions {
  currency: string;
  language: string;
  maximumFractionDigits?: number;
}

export function amount({ currency, language, maximumFractionDigits = 8 }: AmountFormatOptions, value: string | number) {
  if (!currency) return prepareInput(value).toString();
  const numberFormat = new Intl.NumberFormat(language, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
  return prepareInputText(numberFormat.format(prepareInput(value)));
}

export interface DecimalNumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function decimalNumberFormat(
  { language }: { language: string },
  value: string | number,
  { minimumFractionDigits = 0, maximumFractionDigits = 8 }: DecimalNumberFormatOptions = {},
) {
  const numberFormat = new Intl.NumberFormat(language, {
    style: "decimal",
    minimumFractionDigits,
    maximumFractionDigits,
  });
  return prepareInputText(numberFormat.format(prepareInput(value)));
}

function prepareInputText(value: string | number) {
  return value.toString().replace(",", ".");
}

function prepareInput(value: string | number) {
  return parseFloat(prepareInputText(value));
}
