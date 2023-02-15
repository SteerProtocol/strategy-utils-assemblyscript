import { JSON } from 'json-as/assembly';

@serializable
export class Candle {
  timestamp: i64 = 0; 
  high: number = 0.0; 
  low: number  = 0.0;
  open: number = 0.0;
  close: number = 0.0;
  volume: number = 0.0;

  constructor(timestamp: i64, high: number, low: number, open: number, close: number, volume: number) {
    this.timestamp = timestamp;
    this.high = high;
    this.low = low;
    this.open = open;
    this.close = close;
    this.volume = volume;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

/**
 * 
 * @param _data data connector data array
 * @returns 
 */
export function parsePrices(_data: string): Array<Candle> {
  return parseCandles(_data);
}

export function parseCandles(_data: string): Array<Candle> {
  // Parse an object using the JSON object
  let parsed: Array<Candle> = JSON.parse<Array<Candle>>(_data);
  return parsed;
}