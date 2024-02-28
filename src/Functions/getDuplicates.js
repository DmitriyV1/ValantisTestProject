function getDuplicates(arr) {
  const flatArr = arr.length > 1 ? arr.flat() : arr;
  const uniqSet = new Set();
  for (let i = 0; i < flatArr.length; i++) {
    for (let j = 0; j < i; j++)
      if (flatArr[j] === flatArr[i]) {
        uniqSet.add(flatArr[i]);
      }
  }

  const uniq = Array.from(uniqSet);

  return uniq;
}

export default getDuplicates;
