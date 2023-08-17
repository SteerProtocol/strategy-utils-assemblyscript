import { Candle } from "./types/Candle";
import { RawTradeData } from "./types/RawTradeData";

// CandlestickConverter class provides a static method to convert raw trade data into OHLCV format
export class CandlestickConverter {
    // convertToOHLCV method accepts raw trade data and a period (default is 3600 seconds or 1 hour)
    // and returns the data in OHLCV format
    static convertToOHLCV(rawData: RawTradeData[], period: i32 = 3600): Candle[] {
        // If the raw data is empty, an error is thrown
        if (rawData.length === 0) {
            throw new Error("Input data is empty");
        }

        // Array to hold the converted data
        let ohlcvData: Candle[] = [];

        // Initialize variables
        let i: i32 = 0;
        let currentTimestamp: i32 = Math.floor(rawData[0].timestamp / period) * period;
        let open: f64 = rawData[0].price;
        let high: f64 = rawData[0].price;
        let low: f64 = rawData[0].price;
        let close: f64 = rawData[0].price;
        let volume: f64 = 0.0;

        // Loop through all raw data
        while (i < rawData.length) {
            // For each period, set the initial values of open, high, low to the closing price of the last period
            // and reset the volume to 0
            open = close;
            high = close;
            low = close;
            volume = 0.0;

            // Process all raw data within the current period
            while (i < rawData.length && rawData[i].timestamp < currentTimestamp + period) {
                // Set the open price to the price of the first trade in the period
                open = i == 0 ? rawData[i].price : open;
                // Update high and low prices
                high = Math.max(high, rawData[i].price);
                low = Math.min(low, rawData[i].price);
                // Update close price to the price of the last trade in the period
                close = rawData[i].price;
                // Update the total volume
                volume += rawData[i].volume;
                i++;
            }

            // Create a new Candle object with the calculated OHLCV values and add it to the array
            let ohlcv: Candle = new Candle(currentTimestamp, open, high, low, close, volume);
            ohlcvData.push(ohlcv);

            // Move to the next period
            currentTimestamp += period;
        }

        // Return the converted data
        return ohlcvData;
    }
}
