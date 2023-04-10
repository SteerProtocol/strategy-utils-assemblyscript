export function _getMax(arr: Array<f64>): f64 {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

  export function getMax(a: f64, b: f64): f64 {
    if (a >= b) return a
    return b
}


export function _normalDensity(std: f64, mean: f64, x: f64): f64 {
  return f64(
    (f64(Math.E) ** (((x - mean) / std) ** 2 / -2) / std) *
      Math.sqrt(2 * f64(Math.PI))
  );
}

export function _standardDeviation(list:f64[]): f64 {
  const mean = _mean(list)
  const sqrdDiff: f64[] = []
  for (let i = 0; i < list.length; i++){
      sqrdDiff.push((list[i]-mean)*(list[i]-mean))
  }
  const variance = _mean(sqrdDiff)
  const stddev = Math.sqrt(variance)
  return f64(stddev)
}

// SMA simple moving average
export function _mean(list: f64[]): f64 {
  const length = list.length;
  let total: f64 = 0.0;
  for (let i = 0; i < length; i++){
      total += list[i]
  }
  return total / f64(length)
}
