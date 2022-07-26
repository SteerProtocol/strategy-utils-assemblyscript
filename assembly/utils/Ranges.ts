import { Price } from "./types/Price";
import { getMax, _mean, _getMax } from "./Math";

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
  
      let max = _getMax([f32(range1), f32(range2), f32(range3)]);
      rangeSum += max;
    }
    

    return f32(rangeSum) / f32(prices.length - 1);

  }


  export   function trailingStop(percent: f32, prices: Price[]): f32 {
    // Get the current price of the asset pair
    const currentPrice = prices[prices.length - 1];

    // Calculate the trailing stop price
    const trailingStopPrice = currentPrice.close - (currentPrice.close * f32(percent / 100));

    // Return the trailing stop price
    return trailingStopPrice;
}

export function trueRange(price: Price): f32{
  const trueRange = getMax(price.high - price.low,getMax(Math.abs(price.high-price.close),Math.abs(price.low-price.close)));
  return trueRange;
}

export function averageTrueRange(prices: Price[]): f32 {
  const trueRanges: f32[] = []
  for (let i = 0; i < prices.length; i++) {
      trueRanges.push(trueRange(prices[i]));
  }
  return _mean(trueRanges);
}