import { JSON } from "assemblyscript-json";

export class Price {
  constructor(
    public high: f32,
    public low: f32,
    public open: f32,
    public close: f32
  ) {}
}

export function parsePrices(_prices: String): Array<Price> {
  const prices = _prices;
  // Parse an object using the JSON object
  let jsonObj: JSON.Obj = <JSON.Obj>JSON.parse(prices);
  const result: Array<Price> = [];

  const val = jsonObj.getValue("data");
  if (val != null) {
    if (val.isArr) {
      const pricesArray = (<JSON.Arr>val).valueOf();

      for (let priceIndex = 0; priceIndex < prices.length; priceIndex++) {
        const price = pricesArray[priceIndex];

        const candle = <JSON.Obj>JSON.parse(price.toString());

        if (candle) {
          const cl = candle.getValue("close");
          const hi = candle.getValue("high");
          const lo = candle.getValue("low");
          const op = candle.getValue("open");

          if (cl && hi && lo && op) {
            const close = f32(cl.toString());
            const high = f32(hi.toString());
            const low = f32(lo.toString());
            const open = f32(op.toString());

            const obj: Price = new Price(high, low, open, close);

            result.push(obj);
          }
        }

        return result;
      }
    }
    return [];
  } else {
    return [];
  }
}
