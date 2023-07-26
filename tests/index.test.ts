import {  candles } from "./utils";
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
      test("Can return positions on none type", async () => {        
        const config = `{
          "elapsedTendTime": 604800,
          "triggerStyle": "None",
          "strategy": "Classic",
          "liquidityShape": "Linear",
          "poolFee": 3000,
          "placementType": "Position over current price",
          "positionSize": 600
        }`
        myModule.initialize(config);
        const positions = '[[257100],[257300],[1]]'
        const currentTick = '257301'
        const timeSinceLastExecution = '5600'
        const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
        (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
        expect(result).not.toEqual('continue')
      });

      test("Can return continue for active trigger", async () => {        
          const config = `{
            "elapsedTendTime": 604800,
            "triggerStyle": "Price leaves active range",
            "strategy": "Classic",
            "liquidityShape": "Linear",
            "poolFee": 500,
            "placementType": "Position over current price",

            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257251'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
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

            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257301'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
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

            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257251'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
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

            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257301'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
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

            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257251'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
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

            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257301'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
          expect(result).not.toEqual('continue')
        });

        test("Can return continue for one way inactive - active", async () => {        
          const config = `{
            "elapsedTendTime": 604800,
            "triggerStyle": "Price moves one way past positions",
            "triggerWhenOver": true,
            "strategy": "Classic",
            "liquidityShape": "Linear",
            "poolFee": 3000,
            "placementType": "Position over current price",
            "triggerWhenOver": true,
            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257251'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
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
            "positionSize": 600
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257000'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
          expect(result).toEqual('continue')
        });

        test("Can return positions for one way inactive - above", async () => {        
          const config = `{
            "elapsedTendTime": 604800,
            "triggerStyle": "Price moves one way past positions",
            "triggerWhenOver": true,
            "strategy": "Classic",
            "liquidityShape": "Linear",
            "poolFee": 500,
            "placementType": "Position over current price",
            "triggerWhenOver": true,
            "positionSize": 100
          }`
          myModule.initialize(config);
          const positions = '[[257100],[257300],[1]]'
          const currentTick = '257301'
          const timeSinceLastExecution = '5600'
          const result = myModule["execute(param_1: string, param_2: string, param_3: string, param_4: string)"]
          (JSON.stringify(candles), positions, currentTick, timeSinceLastExecution);
          expect(result).not.toEqual('continue')
        });
    });
});