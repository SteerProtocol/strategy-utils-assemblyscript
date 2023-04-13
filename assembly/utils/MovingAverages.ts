export class SMA {
  private readonly prices: f64[] = [];
  private interval: i32 = 0;
  private result: f64 = 0
  // private prevEMA: f64;

  constructor(interval: i32) {
    this.interval = interval;
  }

  getResult(): f64 {
    return this.result;
  }

  update(price: f64): void {
    this.prices.push(price);

    if (this.prices.length > this.interval) {
      this.prices.shift();
    }

    if (this.prices.length === this.interval) {
      let result = f64(0);
      for (let priceIndex = 0; priceIndex < this.prices.length; priceIndex++) {
        result = result + this.prices[priceIndex];
      }
      this.result = result / f64(this.prices.length || 1);
    }
  }
}

export class EMA {
  private readonly prices: f64[] = [];
  private interval: i32 = 0;
  private result: f64 = 0
  private multiplier: i32;
  private prevEMA: f64 = 0

  constructor(interval: i32, multiplier: i32) {
    this.interval = interval;
    this.multiplier = multiplier;
  }

  getResult(): f64 {
    return this.result;
  }

  update(price: f64): void {
    this.prices.push(price);

    if (this.prices.length > this.interval) {
      this.prices.shift();
    } // remove oldest price

    if (!this.prevEMA) {
      this.prevEMA = price;
    }

    let p1 = price * (f64(this.multiplier) / (1 + f64(this.interval)));
    let p2 =
      this.prevEMA * (1 - f64(this.multiplier) / (1 + f64(this.interval)));

    this.result = f64(p1 + p2);
    this.prevEMA = this.result;
  }
}
