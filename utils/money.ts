const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  notation: "compact",
});

function timeFrame(payRangeTimeFrame: string) {
  if (!payRangeTimeFrame) return "";
  else return `/${payRangeTimeFrame.toLowerCase()}`;
}

export function formatPay(
  payRangeMin: number,
  payRangeMax: number,
  payRangeTimeFrame: string
) {
  // if no min and max
  if (!payRangeMin && !payRangeMax) return "Pay Not Given";
  // if only min
  else if (!payRangeMax)
    return `${formatter.format(payRangeMin)}+${timeFrame(payRangeTimeFrame)}`;
  // if only max
  else if (!payRangeMin)
    return `Up to ${formatter.format(payRangeMax)}${timeFrame(
      payRangeTimeFrame
    )}`;
  // if min = max
  else if (payRangeMin === payRangeMax)
    return formatter.format(payRangeMax) + timeFrame(payRangeTimeFrame);
  // if min and max
  return `${formatter.format(payRangeMin)}${timeFrame(
    payRangeTimeFrame
  )} - ${formatter.format(payRangeMax)}${timeFrame(payRangeTimeFrame)}`;
}

export function formatEquity(
  equityRangeMin: number | null,
  equityRangeMax: number | null
) {
  // if no min or max
  if (!equityRangeMin && !equityRangeMax) return "Equity Not Given";
  // if min and max = 0
  if (equityRangeMin === 0 && equityRangeMax === 0) return "No Equity";
  // if only min
  else if (!equityRangeMin) return `${equityRangeMax}%+`;
  // if only max
  else if (!equityRangeMin) return `Up to ${equityRangeMax}%`;
  // if min = max
  else if (equityRangeMin === equityRangeMax) return `${equityRangeMax}%`;
  // if min and max
  return `${equityRangeMin}% - ${equityRangeMax}%`;
}
