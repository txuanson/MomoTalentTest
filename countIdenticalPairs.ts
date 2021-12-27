/**
 * Algorithm Test - Count Identical Pair 
 * Idea: Count the frequency (frq) of each element using a HashMap (HashTable).
 * So number of pairs of each distinct value is (frq)C2. 
 */

export default function countIdenticalPairs(A: number[]): number {
  const map = new Map<number, number>();

  A.forEach(element => {
    map.set(element, (map.get(element) || 0) + 1);
  });

  let result = 0;
  map.forEach(value => {
    result += (value * (value - 1)) / 2
  });

  return result;
}