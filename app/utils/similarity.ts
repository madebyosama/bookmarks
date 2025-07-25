// Function to calculate the similarity between two strings using Dice's Coefficient
export function getSimilarity(str1: string, str2: string): number {
  const bigrams = (s: string) =>
    s
      .toLowerCase()
      .split('')
      .map((_, i, arr) => arr.slice(i, i + 2).join(''))
      .filter((v) => v.length === 2);

  const bigrams1 = bigrams(str1);
  const bigrams2 = bigrams(str2);
  const intersection = bigrams1.filter((bigram) => bigrams2.includes(bigram));
  return (2 * intersection.length) / (bigrams1.length + bigrams2.length);
}
