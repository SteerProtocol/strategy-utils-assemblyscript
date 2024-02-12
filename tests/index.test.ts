import {  candles2,  } from "./utils";
import fs from 'fs';
import { WasmModule, loadWasm } from "@steerprotocol/app-loader";


describe("Unit tests", () => {
  let myModule: WasmModule;
  
  beforeEach(async () => {
    myModule = await loadWasm(fs.readFileSync(__dirname + "/debug.wasm"), {})
  });

    describe("Trigger tests", () => {
      // Testing the following options
      // 'Current Price set distance from center of positions',
      // 'Price leaves active range',
      // 'Price moves percentage of active range away',
      // 'Price moves one way past positions',
      // 'None'
// TEST tirggers
test("Can return positions on none type", async () => {        
  const config = `{
    "triggerStyle": "None",
    "period":6,
    "standardDeviations":2.0,
    "liquidityShape": "Linear",
    "poolFee": 3000,
    "placementType": "Position over current price",
    "positionSize": 600
  }`
  myModule.initialize(config);
  const positions = '[[257100],[257300],[1]]'
  const currentTick = '257301'
  const timeSinceLastExecution = '5600'
  const result = myModule.execute
  (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
  expect(result).not.toEqual('continue')
});

test
("Can return continue for active trigger", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price leaves active range",
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 500,
      "period":6,
      "standardDeviations":2.0
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257251'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute(//...[JSON.stringify(candles2), positions])
    JSON.stringify(candles2),
    positions, 
    currentTick,
    timeSinceLastExecution);
    expect(result).toEqual('continue')
  });

  test("Can return positions for active trigger", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price leaves active range",
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 3000,
      "placementType": "Position over current price",
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257301'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).not.toEqual('continue')
  });

  test("Can return continue for distance trigger", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Current Price set distance from center of positions",
      "tickDistanceFromCenter": 100,
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 3000,
      "placementType": "Position over current price",
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257251'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).toEqual('continue')
  });

  test("Can return positions for distance trigger", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Current Price set distance from center of positions",
      "tickDistanceFromCenter": 100,
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 3000,
      "placementType": "Position over current price",
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257301'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).not.toEqual('continue')
  });

  test("Can return continue for percentage trigger", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price moves percentage of active range away",
      "percentageOfPositionRangeToTrigger": 1,
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 3000,
      "placementType": "Position over current price",
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257251'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).toEqual('continue')
  });

  test("Can return positions for percentage trigger", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price moves percentage of active range away",
      "percentageOfPositionRangeToTrigger": 1,
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 3000,
      "placementType": "Position over current price",
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257301'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).not.toEqual('continue')
  });

  test("Can return continue for one way inactive - active", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price moves one way past positions",
      "triggerWhenOver": true,
      "poolFee": 3000,
      "placementType": "Position over current price",
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257251'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).toEqual('continue')
  });

  test("Can return continue for one way inactive - below", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price moves one way past positions",
      "triggerWhenOver": true,
      "strategy": "Classic",
      "liquidityShape": "Linear",
      "poolFee": 3000,
      "placementType": "Position over current price",
      "triggerWhenOver": true,
      "period":6,
      "standardDeviations":2.0,
      "positionSize": 600
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257000'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify(candles2), positions, currentTick, timeSinceLastExecution);
    expect(result).toEqual('continue')
  });

  test("Can return positions for one way inactive - above", async () => {        
    const config = `{
      "elapsedTendTime": 604800,
      "triggerStyle": "Price moves one way past positions",
      "triggerWhenOver": true,
      "strategy": "Bollinger Band",
      "liquidityShape": "Linear",
      "poolFee": 500,
      "placementType": "Position over current price",
      "triggerWhenOver": true,
      "lookback": 12,
      "period":6,
      "standardDeviations":2.0,
    }`
    myModule.initialize(config);
    const positions = '[[257100],[257300],[1]]'
    const currentTick = '257301'
    const timeSinceLastExecution = '5600'
    const result = myModule.execute
    (JSON.stringify([...candles2]), positions, currentTick, timeSinceLastExecution);
    expect(result).not.toEqual('continue')
  });
    });
});