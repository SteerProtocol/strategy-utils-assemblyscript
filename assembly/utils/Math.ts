const PI_F32 = f32(Math.PI);
const E_F32 = f32(Math.E);
const TWO_PI_SQRT_F32 = f32(Math.sqrt(2 * PI_F32));

export function _getMax(arr: Array<f32>): f32 {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

  export function getMax(a: f32, b: f32): f32 {
    if (a >= b) return a
    return b
}


export function _normalDensity(std: f32, mean: f32, x: f32): f32 {
  return (E_F32 ** (((x - mean) / std) ** 2 / -2) / std) * TWO_PI_SQRT_F32;
}

export function _standardDeviation(list:f32[]): f32 {
  const mean = _mean(list)
  const sqrdDiff: f32[] = []
  for (let i = 0; i < list.length; i++){
      sqrdDiff.push((list[i]-mean)*(list[i]-mean))
  }
  const variance = _mean(sqrdDiff)
  const stddev = Math.sqrt(variance)
  return f32(stddev)
}

// SMA simple moving average
export function _mean(list: f32[]): f32 {
  const length = list.length;
  let total: f32 = 0.0;
  for (let i = 0; i < length; i++){
      total += list[i]
  }
  return total / f32(length)
}
