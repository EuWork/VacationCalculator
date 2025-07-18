import { decimalNumberFormat } from "@app/kit";

function format(value: number) {
  return decimalNumberFormat({ language: "ru" }, value, { maximumFractionDigits: 1 });
}

export function numberToHundredsK(value: number) {
  if (value < 1_000) return format(value);
  if (value < 1_000_000) return format(value / 1_000) + "K";
  if (value < 1_000_000_000) return format(value / 1_000_000) + "M";
  return format(value / 1_000_000_000) + "B";
}
