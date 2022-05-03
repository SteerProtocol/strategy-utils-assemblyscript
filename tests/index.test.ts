const myModule = require("../index");

describe("WASM Module", () => {
  describe("keltnerChannels", () => {
    it("Price should ", async () => {
      const price =  new myModule.Price(1,2,3,4);
      expect(price.high).toBe(1);
      expect(price.low).toBe(2);
      expect(price.open).toBe(3);
      expect(price.close).toBe(4);
    });
    it("True average should compute properly", async () => {
      const prices =  [new myModule.Price(1,2,3,4),new myModule.Price(2,3,4,5)];
      const trueAverage = myModule.getAverageTrueRange(prices, 1);
      expect(trueAverage).toBe(2);
    });
    it("True average should support decimals ", async () => {
      const prices =  [new myModule.Price(6.1,4.2,2.5,1.11),new myModule.Price(41,32,41,15)];
      const trueAverage = myModule.getAverageTrueRange(prices, 1);
      expect(trueAverage).toBe(39.88999938964844)
    });
  });
});
