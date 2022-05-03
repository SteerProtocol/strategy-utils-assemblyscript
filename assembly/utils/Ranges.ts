import { Price } from "./types/Price";
import { getMax } from "./Math";

export function getAverageTrueRange(prices: Array<Price>, interval: i32): f32 {
    let rangeSum: f32 = 0;
    for (let i = 1; i < prices.length; i++) {
      const currentPrice = prices[i];

      const currentHigh = currentPrice.high
      const currentLow = currentPrice.low 
      const previousClose = prices[i - 1].close
  
      const range1 = Math.abs(currentHigh - previousClose);
      const range2 = Math.abs(currentLow - previousClose);
      const range3 = Math.abs(currentHigh - currentLow);
  
      let max = getMax([f32(range1), f32(range2), f32(range3)]);
      rangeSum += max;
    }
    

    return f32(rangeSum) / f32(prices.length - 1);

  }