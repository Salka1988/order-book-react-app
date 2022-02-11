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

export const toFixedCustom = (x) => {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split('e-')[2]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
};

export const toFixedTrunc = (x, n) => {
  x = toFixedCustom(x);

  // From here on the code is the same than the original answer
  const v = (typeof x === 'string' ? x : x.toString()).split('.');
  if (n <= 0) return v[0];
  let f = v[1] || '';
  if (f.length > n) return `${v[0]}.${f.substr(0, n)}`;
  while (f.length < n) f += '0';
  return `${v[0]}.${f}`;
};
