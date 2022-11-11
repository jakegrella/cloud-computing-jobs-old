function plurality(number: number, word: string) {
  return number === 1 ? `${number} ${word}` : `${number} ${word}s`;
}

export function relativeDate(isoDate: Date) {
  // if isoDate is NULL
  if (!isoDate) return "Unpublished";

  // convert incoming date from ISO to Date
  const date = new Date(isoDate);
  const now = new Date();

  // get difference in seconds
  const diff = (now.valueOf() - date.valueOf()) / 1000;

  // return relative date
  if (diff > 2592000) return `>30 days ago`;
  else if (diff > 86400)
    return `${plurality(Math.floor(diff / 86400), "day")} ago`;
  else if (diff > 3600)
    return `${plurality(Math.floor(diff / 3600), "hour")} ago`;
  else if (diff > 60)
    return `${plurality(Math.floor(diff / 60), "minute")} ago`;
  else return `${plurality(Math.floor(diff / 1), "second")} ago`;
}
