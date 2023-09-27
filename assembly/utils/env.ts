export declare function generateCandles(data: string, candleSize: string): string;
@external("env", "ccxt_fetchOHLCV")
declare function _ccxt_fetchOHLCV(exchangeId: string, symbol: string, timeframe: string, limit: number, since: number): StaticArray<StaticArray<f64>>;

// Required for asyncify
// @ts-ignore: Global should exist here
@global let __ASYNCIFY_INITIALIZED = false;
@external("env", "_initAsyncify")
declare function _initAsyncify(asyncify_data_ptr: usize, stack_pointer: usize): void;

export function ccxt_fetchOHLCV(exchangeId: string, symbol: string, timeframe: string, limit: number, since: number): StaticArray<StaticArray<f64>> {
    if (!__ASYNCIFY_INITIALIZED) {
        // We need to initialize space for Asyncify to work.
        // Asyncify will create a full - duplex communication channel through this bit of memory.
        // For every asyncify-enabled function, make sure to add this
        // memory.data() reserves a section of data that is not touched by the Garbage Collector
        // We can only do this once or else we will cause a memory leak and eventual overflow
        // It will not grow past the stack pointer which is where real data starts.
        _initAsyncify(memory.data(8, 16), __stack_pointer);
        __ASYNCIFY_INITIALIZED = true;
    }
    return _ccxt_fetchOHLCV(exchangeId, symbol, timeframe, limit, since);
}

export declare function timeString(candleSize: string, returnUnit: string): number;