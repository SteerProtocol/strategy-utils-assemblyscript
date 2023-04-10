import { Candle } from "./types/Candle";
import { getMax, _mean, _getMax } from "./Math";

export function getAverageTrueRange(candles: Array<Candle>, interval: i32): f64 {
    let rangeSum: f64 = 0;
    for (let i = 1; i < candles.length; i++) {
      const currentPrice = candles[i];

      const currentHigh = currentPrice.high
      const currentLow = currentPrice.low 
      const previousClose = candles[i - 1].close
  
      const range1 = Math.abs(currentHigh - previousClose);
      const range2 = Math.abs(currentLow - previousClose);
      const range3 = Math.abs(currentHigh - currentLow);
  
      let max = _getMax([f64(range1), f64(range2), f64(range3)]);
      rangeSum += max;
    }
    

    return f64(rangeSum) / f64(candles.length - 1);

  }


  export   function trailingStop(percent: f64, prices: Candle[]): f64 {
    // Get the current price of the asset pair
    const currentPrice = prices[prices.length - 1];

    // Calculate the trailing stop price
    const trailingStopPrice = currentPrice.close - (currentPrice.close * f64(percent / 100));

    // Return the trailing stop price
    return f64(trailingStopPrice);
}

export function trueRange(price: Candle): f64{
  const trueRange = getMax(f64(price.high) - f64(price.low),getMax(f64(Math.abs(price.high-price.close)),f64(Math.abs(price.low-price.close))));
  return trueRange;
}

export function averageTrueRange(prices: Candle[]): f64 {
  const trueRanges: f64[] = []
  for (let i = 0; i < prices.length; i++) {
      trueRanges.push(trueRange(prices[i]));
  }
  return _mean(trueRanges);
}