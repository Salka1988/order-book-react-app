export function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let mid = Math.floor(arr.length / 2);
  let subLeft = mergeSort(arr.slice(0, mid));
  let subRight = mergeSort(arr.slice(mid));

  return merge(subLeft, subRight);
}

function merge(a, b) {
  let result = [];
  while (a.length > 0 && b.length > 0) result.push(a[0] < b[0] ? a.shift() : b.shift());
  return result.concat(a.length ? a : b);
}

export function binarySearch(items, value) {
  let startIndex = 0,
    stopIndex = items.length - 1,
    middle = Math.floor((stopIndex + startIndex) / 2);

  while (items[middle]?.title !== value && startIndex < stopIndex) {
    //adjust search area
    if (value < items[middle]?.title) {
      stopIndex = middle - 1;
    } else if (value > items[middle]?.title) {
      startIndex = middle + 1;
    }

    //recalculate middle
    middle = Math.floor((stopIndex + startIndex) / 2);
  }

  //make sure it's the right value
  return items[middle]?.title !== value ? -1 : middle;
}

export const filterFunc = (array, searchStr) => {
  console.warn(array);
  console.warn(searchStr);

  let results = array?.filter((value) => {
    return value?.title?.indexOf(searchStr?.toUpperCase()) >= 0;
  });

  console.warn(results);
  return results;
};
