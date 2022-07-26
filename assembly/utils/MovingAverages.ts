

// WARNING: classes will initially be allocated 1 page of memory, you will likely need to add size or flatten these classes
export class SMA {
  private readonly prices: f32[] = [];
  private interval: i32 = 0;
  private result: f32;
  private prevEMA: f32;

  constructor(interval: i32) {
    this.interval = interval;
  }

  getResult(): f32 {
    return this.result;
  }


  update(price: f32): void {
    this.prices.push(price);

    if (this.prices.length > this.interval) {
      this.prices.shift();
    }

    if (this.prices.length === this.interval) {
      let result = f32(0);
      for (let priceIndex = 0; priceIndex < this.prices.length; priceIndex++) {
        result = result + this.prices[priceIndex]
      }
      this.result = result / f32(this.prices.length || 1);
    }

  }
}

export class EMA {
  private readonly prices: f32[] = [];
  private interval: i32 = 0;
  private result: f32;
  private multiplier: i32;
  private prevEMA : f32


  constructor(interval: i32, multiplier: i32) {
    this.interval = interval;
    this.multiplier = multiplier;
  }

  getResult(): f32 {
    return this.result;
  }

  update(price: f32): void {
    this.prices.push(price);

    if (this.prices.length > this.interval) {
      this.prices.shift();
    }  // remove oldest price

    if (!this.prevEMA) {
      this.prevEMA = price;
    }


    let p1 = price * (f32(this.multiplier) / (1 + f32(this.interval)))
    let p2 = this.prevEMA * (1 - (f32(this.multiplier) / (1 + f32(this.interval))))
    
    this.result = f32(p1 + p2)
    this.prevEMA = this.result;

  }
}