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

@serializable
class PricePayload {
  data: Price[][] = [];
}

export function parsePrices(_prices: string): Array<Price> {
  const payload = JSON.parse<PricePayload>(_prices);

  if (payload.data.length == 0) {
    return [];
  }

  return payload.data[0];
}
