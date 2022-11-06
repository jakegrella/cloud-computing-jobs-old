export function jobsPlurality(length: number, capitalize: boolean = true) {
  let returnedWord = length === 1 ? "Job" : "Jobs";
  if (capitalize) {
    return returnedWord;
  }
  return returnedWord.toLowerCase();
}
