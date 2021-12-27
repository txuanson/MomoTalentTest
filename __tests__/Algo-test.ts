import countIdenticalPairs from "../countIdenticalPairs";

describe('Test algorithm - Count Identical Pairs', () => {
  test('Input: [1, 1, 5, 7, 2, 2] => 2', () => {
    const result = countIdenticalPairs([1, 1, 5, 7, 2, 2]);
    expect(result).toEqual(2);
  });
  test('Input: [1, 2, 3, 1, 3, 6, 3, 5, 3, 5] => 8', () => {
    const result = countIdenticalPairs([1, 2, 3, 1, 3, 6, 3, 5, 3, 5]);
    expect(result).toEqual(8);
  });
  test('Input: [1, 2, 4, 1, 1, 3, 2, 2, 5, 6, 2, 3, 3] => 12', () => {
    const result = countIdenticalPairs([1, 2, 4, 1, 1, 3, 2, 2, 5, 6, 2, 3, 3]);
    expect(result).toEqual(12);
  });
})