import {Price} from "./types";
import { JSON} from "assemblyscript-json";

export function parsePrices(_prices: String): Array<Price> {
    const prices = _prices;
    // Parse an object using the JSON object
    let jsonObj: JSON.Obj = <JSON.Obj>JSON.parse(prices);
    const result: Array<Price> = [];

    const data_arr = <JSON.Arr>jsonObj.getArr("data");
    if (data_arr == null) {throw new Error()};
    // First and only data result for this strategy is the candles
    const val = <JSON.Arr>data_arr._arr[0]
    if (val != null) {
        if (val.isArr) {
        const pricesArray = (<JSON.Arr>val).valueOf();

        for (let priceIndex = 0; priceIndex < pricesArray.length; priceIndex++) {
            const price = pricesArray[priceIndex];

            const candle = <JSON.Obj>JSON.parse(price.toString());

            if (candle.isObj) {
            const cl = candle.getValue("close");
            const hi = candle.getValue("high");
            const lo = candle.getValue("low");
            const op = candle.getValue("open");

            if (cl && hi && lo && op) {
                //@ts-ignore
                const close = f32(Number.parseFloat(cl.toString()));
                //@ts-ignore
                const high = f32(Number.parseFloat(hi.toString()));
                //@ts-ignore
                const low = f32(Number.parseFloat(lo.toString()));
                //@ts-ignore
                const open = f32(Number.parseFloat(op.toString()));

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