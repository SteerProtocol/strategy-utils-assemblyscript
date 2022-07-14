export function getMax(arr: Array<f32>): f32 {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

export function _normalDensity(std: f32, mean: f32, x: f32): f32 {
  return f32(
    (f32(Math.E) ** (((x - mean) / std) ** 2 / -2) / std) *
      Math.sqrt(2 * f32(Math.PI))
  );
}