import { JSON } from 'json-as/assembly';

@serializable
export class RawTradeData {
    timestamp: i64 = 0;
    price: f64 = 0.0;
    volume: f64 = 0.0;

    constructor(timestamp: i64, price: f64, volume: f64) {
        this.timestamp = timestamp;
        this.price = price;
        this.volume = volume;
    }
}