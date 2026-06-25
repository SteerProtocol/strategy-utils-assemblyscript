import { JSON } from "json-as/assembly";

@serializable
export class Price {
  constructor(
    public high: f32 = 0,
    public low: f32 = 0,
    public open: f32 = 0,
    public close: f32 = 0
  ) {}
}

function parsePriceField(candle: JSON.Obj, key: string): f32 {
  const value = candle.get(key);

  if (value === null) {
    return 0;
  }

  if (value!.type == JSON.Types.String) {
    return f32.parse(value!.get<string>());
  }

  return f32.parse(value!.toString());
}

export function parsePrices(_prices: string): Array<Price> {
  const payload = JSON.parse<JSON.Obj>(_prices);
  const dataValue = payload.get("data");

  if (dataValue === null) {
    return [];
  }

  const data = dataValue!.get<JSON.Arr>();
  if (data.length == 0) {
    return [];
  }

  const candles = data.getAs<JSON.Arr>(0);
  const result = new Array<Price>();

  for (let priceIndex = 0; priceIndex < candles.length; priceIndex++) {
    const candle = candles.getAs<JSON.Obj>(priceIndex);
    result.push(new Price(
      parsePriceField(candle, "high"),
      parsePriceField(candle, "low"),
      parsePriceField(candle, "open"),
      parsePriceField(candle, "close"),
    ));
  }

  return result;
}
