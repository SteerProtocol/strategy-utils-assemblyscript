const myModule = require("../index");

describe("WASM Module", () => {
  describe("keltnerChannels", () => {
    it("Price should ", async () => {
      const price =  new myModule.Candle("123",1,2,3,4);
      expect(price.high).toBe(1);
      expect(price.low).toBe(2);
      expect(price.open).toBe(3);
      expect(price.close).toBe(4);
    });
    it("True average should compute properly", async () => {
      const prices =  [new myModule.Candle("12342343",1,2,3,4),new myModule.Candle("12342343",2,3,4,5)];
      const trueAverage = myModule.getAverageTrueRange(prices, 1);
      expect(trueAverage).toBe(2);
    });
    it("True average should support decimals ", async () => {
      const prices =  [new myModule.Candle("12342343",6.1,4.2,2.5,1.11),new myModule.Candle("12342343",41,32,41,15)];
      const trueAverage = myModule.getAverageTrueRange(prices, 1);
      expect(trueAverage).toBe(39.88999938964844)
    });
    it("Should parse candles ", async () => {
      const candles =  '[{"timestamp":"12312312123","high":6.1,"low":4.2,"open":2.5,"close":1.11},{"timestamp":"12312312123","high":41.1,"low":32.1,"open":41.2,"close":15.1}]'
      const candlesArray = myModule.parseCandles(candles);
      expect(candlesArray.length).toBe(2)
    });
  });
});
