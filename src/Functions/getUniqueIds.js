function getUniqueItems(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export default getUniqueItems;
