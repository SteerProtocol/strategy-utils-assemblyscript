# Strategy Utility Functions API Reference

## Triggers.ts

Trigger logic is created and implemented with the expectation to reduce the number of unnecessary executions. If the state of a liquidity providing vault is acceptable, such trigger logic can be used to determine if action should be taken or not. This reduces gas costs and unnecessary on-chain executions. The trigger functions are designed to return `true` in the event action should be taken (the trigger condition is met). In the case of `false` the condition is satisfactory and the user can factor in their own logic or return `continue` to skip execution. If the trigger depends on some information set by the user like triggering only when the price is over a ceratin percentage from the current active range (see triggerFromPercentage), variables such as the percentage should be added to the strategy configuration.

### Example

Imagine we will have a SushiLiquidityManager that will have a very broad liquidity coverage that we wish to only execute when our positions are out of range from the current tick. To do this we can utilize `triggerPositionsInactive` to check for this condition. In order to use many of the trigger functions, we will need the current positions provided by the `Liquidity Manager Positions` data connector. Additionally, we will need the current tick provided by a `V3 Pool Current Tick` data connector. These will need to be configured at the creation of the vault. In our strategy's execute function, the resulting current positions and current tick will be passed in as parameters in the configured order. Armed with this data, we can use the trigger function and return continue if the execution logic is untriggered.

```assemblyscript
export function execute(_currentTick: string, _currentPositions: string, ...any other data connector results for custom logic...): string {
    // parse our data connector results
    const currentTick = parseInt(_currentTick);
    currentPositions = parseActiveRange(_positions);
    // handle null cases
    ...
    // call triggerPositionsInactive to see if we should execute
    if (triggerPositionsInactive(currentPositions, currentTick)) return 'continue'
    // if we don't return continue, we will execute our main logic for determining the new positions to be minted
    ...
}

```

---

### `parseActiveRange(_positions: string): Position`

This function parses the active position range from the type of string output of `LM.getPositions()`. It takes a string parameter `_positions`, which is expected to be in the format `[[#,#,#],[#,#,#],[#,#,#]]`, representing the lower tick, upper tick, and weight of a liquidity manager's positions.

**Parameters**

- `_positions` (string): The string representation of positions in the format `[[#,#,#],[#,#,#],[#,#,#]]`.

**Returns**

- `Position`: An instance of the `Position` class representing the parsed active range, with the lowest starting tick and highest upper tick from the recieved set of positions. Weight is set to 100 by default.

---

### `emptyCurrentPosition(currentPosition: Position): boolean`

This function checks if the current position is empty. It takes a `currentPosition` parameter of type `Position`.

**Parameters**

- `currentPosition` (Position): The current position to check.

**Returns**

- `boolean`: Returns `true` if the current position ticks are the same (empty position), indicating that action should be taken. Returns `false` otherwise.

---

### `triggerFromDistance(currentPosition: Position, rebalanceWidth: i64, currentTick: i64): boolean`

This function triggers an action based on the distance between the current tick and the center of the position range. It compares the current tick to upper and lower trigger bounds calculated from the `rebalanceWidth` parameter.

**Parameters**

- `currentPosition` (Position): The current position.
- `rebalanceWidth` (i64): The width (distance) from the center of the position range to trigger an action.
- `currentTick` (i64): The current tick to compare against the trigger bounds.

**Returns**

- `boolean`: Returns `true` if the current tick is outside the trigger bounds, indicating that action should be taken. Returns `false` if the current tick is within the trigger bounds, indicating that execution should be skipped.

---

### `triggerFromPercentage(currentPosition: Position, rebalancePercentage: f64, currentTick: i64): boolean`

This function triggers an action based on the percentage difference between the current tick and the center of the position range. It compares the current tick to upper and lower trigger bounds calculated from the `rebalancePercentage` parameter.

**Parameters**

- `currentPosition` (Position): The current position.
- `rebalancePercentage` (f64): The percentage difference from the center of the position range to trigger an action.
- `currentTick` (i64): The current tick to compare against the trigger bounds.

**Returns**

- `boolean`: Returns `true` if the current tick is outside the trigger bounds, indicating that action should be taken. Returns `false` if the current tick is within the trigger bounds, indicating that execution should be skipped.

---

### `triggerPositionsInactive(currentPosition: Position, currentTick: i64): boolean`

This function triggers an action when the current tick is no longer within the current position range.

**Parameters**

- `currentPosition` (Position): The current position.
- `currentTick` (i64): The current tick to compare against the position range.

**Returns**

- `boolean`: Returns `true` if the current tick is outside the position range, indicating that action should be taken. Returns `false` if the current tick is within the position range, indicating that execution should be skipped.

---

### `triggerFromSpecifiedPrice(triggerTick: i64, currentTick: i64, triggerOver: boolean): boolean`

This function triggers an action when the current tick goes over or under a specified trigger tick.

**Parameters**

- `triggerTick` (i64): The trigger tick to compare against the current tick.
- `currentTick` (i64): The current tick to compare against the trigger tick.
- `triggerOver` (boolean): Indicates whether the trigger should activate when the current tick is greater than the trigger tick (`true`), or when it is less than the trigger tick (`false`).

**Returns**

- `boolean`: Returns `true` if the trigger condition is met, indicating that action should be taken. Returns `false` otherwise.

---

### `triggerPricePastPositions(currentPosition: Position, currentTick: i64, triggerOver: boolean): boolean`

This function triggers an action when the current tick goes over or under the current position's range. It only triggers in one direction.

**Parameters**

- `currentPosition` (Position): The current position.
- `currentTick` (i64): The current tick to compare against the position range.
- `triggerOver` (boolean): Indicates whether the trigger should activate when the current tick is greater than the position's end tick (`true`), or when it is less than the position's start tick (`false`).

**Returns**

- `boolean`: Returns `true` if the trigger condition is met, indicating that action should be taken. Returns `false` otherwise.

---

## Math.ts

### `_getMax(arr: Array<f64>): f64`

This function calculates the maximum value in an array of floating-point numbers. It takes an array `arr` as input.

**Parameters**

- `arr` (Array<f64>): The array of floating-point numbers.

**Returns**

- `f64`: The maximum value in the array.

---

### `getMax(a: f64, b: f64): f64`

This function returns the maximum value between two floating-point numbers `a` and `b`.

**Parameters**

- `a` (f64): The first floating-point number.
- `b` (f64): The second floating-point number.

**Returns**

- `f64`: The maximum value between `a` and `b`.

---

### `_normalDensity(std: f64, mean: f64, x: f64): f64`

This function calculates the value of the normal density function for a given standard deviation (`std`), mean (`mean`), and input value (`x`).

**Parameters**

- `std` (f64): The standard deviation.
- `mean` (f64): The mean.
- `x` (f64): The input value.

**Returns**

- `f64`: The value of the normal density function.

---

### `_standardDeviation(list: f64[]): f64`

This function calculates the standard deviation for an array of floating-point numbers (`list`).

**Parameters**

- `list` (f64[]): The array of floating-point numbers.

**Returns**

- `f64`: The standard deviation of the input array.

---

### `_mean(list: f64[]): f64`

This function calculates the mean (average) of an array of floating-point numbers (`list`).

**Parameters**

- `list` (f64[]): The array of floating-point numbers.

**Returns**

- `f64`: The mean (average) of the input array.

---

### `closestDivisibleNumber(num: number, divisor: number, floor: boolean): number`

This function finds the closest number to `num` that is divisible by `divisor`. If `floor` is `true`, the function returns the closest lower divisible number; otherwise, it returns the closest higher divisible number.

**Parameters**

- `num` (number): The number for which to find the closest divisible number.
- `divisor` (number): The divisor used to determine divisibility.
- `floor` (boolean): Indicates whether to return the closest lower divisible number (`true`) or the closest higher divisible number (`false`).

**Returns**

- `number`: The closest divisible number to `num` based on the specified divisor and rounding rule.

## Ranges.ts

### `getAverageTrueRange(candles: Array<Candle>): f64`

This function calculates the average true range (ATR) based on an array of Candle objects (`candles`).

**Parameters**

- `candles` (Array<Candle>): An array of Candle objects representing price data.

**Returns**

- `f64`: The average true range (ATR) value.

---

### `trailingStop(percent: f64, prices: Candle[]): f64`

This function calculates the trailing stop price based on a specified percentage (`percent`) and an array of Candle objects (`prices`).

**Parameters**

- `percent` (f64): The percentage used to calculate the trailing stop price.
- `prices` (Candle[]): An array of Candle objects representing price data.

**Returns**

- `f64`: The trailing stop price.

---

### `trueRange(price: Candle): f64`

This function calculates the true range based on a single Candle object (`price`).

**Parameters**

- `price` (Candle): A Candle object representing price data.

**Returns**

- `f64`: The true range value.

---

### `averageTrueRange(prices: Candle[]): f64`

This function calculates the average true range (ATR) based on an array of Candle objects (`prices`).

**Parameters**

- `prices` (Candle[]): An array of Candle objects representing price data.

**Returns**

- `f64`: The average true range (ATR) value.

## Candle.ts

### `Candle` class

This class represents a candlestick object that contains price data.

**Properties**

- `timestamp` (i64): The timestamp of the candle.
- `high` (f64): The highest price of the candle.
- `low` (f64): The lowest price of the candle.
- `open` (f64): The opening price of the candle.
- `close` (f64): The closing price of the candle.
- `volume` (f64): The trading volume of the candle.

**Constructor**

- `Candle(timestamp: i64, high: f64, low: f64, open: f64, close: f64, volume: f64)`: Creates a new instance of the Candle class with the provided parameters.

**Methods**

- `toString(): string`: Returns a string representation of the Candle object.

---

### `parsePrices(_data: string): Array<Candle>`

This function parses the data connector data array in string format (`_data`) and returns an array of Candle objects.

**Parameters**

- `_data` (string): The data connector data array in string format.

**Returns**

- `Array<Candle>`: An array of Candle objects.

---

### `parseCandles(_data: string): Array<Candle>`

This function is an alias for `parsePrices(_data)` and performs the same functionality. It parses the data connector data array in string format (`_data`) and returns an array of Candle objects.

**Parameters**

- `_data` (string): The data connector data array in string format.

**Returns**

- `Array<Candle>`: An array of Candle objects.

## Position.ts

### `Position` class

This class represents a position with a start tick, end tick, and weight.

**Properties**

- `startTick` (i32): The starting tick of the position.
- `endTick` (i32): The ending tick of the position.
- `weight` (i32): The weight of the position.

**Constructor**

- `Position(startTick: i32, endTick: i32, weight: i32)`: Creates a new instance of the Position class with the provided parameters.

---

## ExecutionContext.ts

### `ExecutionContext` class

This class represents the execution context containing various properties related to the execution environment.

**Properties**

- `executionTimestamp` (number): The execution timestamp.
- `epochLength` (number): The length of the epoch.
- `epochTimestamp` (i32): The epoch timestamp.
- `vaultAddress` (string): The vault address.
- `blockTime` (i32): The block time.
- `blockNumber` (i32): The block number.

---

## SlidingWindow.ts

### `SlidingWindow<T>` class

This class represents a sliding window data structure that stores a fixed-size window of values of type `T`.

**Constructor**

- `SlidingWindow(windowSize: i32, formula: (window: Array<T>) => T)`: Creates a new instance of the SlidingWindow class with the specified window size and formula function.

**Methods**

- `addValue(value: T): void`: Adds a value to the sliding window.
- `getLastValue(): T`: Retrieves the last value added to the sliding window.
- `clear(): void`: Clears the sliding window, resetting all values to `null`.
- `setWindowSize(size: i32): void`: Sets the window size to the specified value.
- `getWindow(): Array<T>`: Retrieves the current window of values.
- `getFormulaResult(): T`: Calculates the formula result using the current window of values and the provided formula function.
- `isStable(): bool`: Checks if the sliding window is stable, i.e., if it contains the specified window size or more values.

Please note that the `SlidingWindow<T>` class is a generic class, allowing you to define the type of values stored in the sliding window.
