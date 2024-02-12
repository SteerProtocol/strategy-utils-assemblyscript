@external("env", "ccxt_fetchOHLCV")
declare function _ccxt_fetchOHLCV(exchangeId: string, symbol: string, timeframe: string, limit: number, since: number): StaticArray<StaticArray<f64>>;

@external("env", "_initAsyncify")
declare function _initAsyncify(asyncify_data_ptr: usize, stack_pointer: usize): void;

// Required for asyncify
// @ts-ignore: Global should exist here
@global let __ASYNCIFY_INITIALIZED = false;

export function ccxt_fetchOHLCV(exchangeId: string, symbol: string, timeframe: string, limit: number, since: number): StaticArray<StaticArray<f64>> {
    if (!__ASYNCIFY_INITIALIZED) {
        _initAsyncify(memory.data(8, 16), __stack_pointer);
        __ASYNCIFY_INITIALIZED = true;
    }
    return _ccxt_fetchOHLCV(exchangeId, symbol, timeframe, limit, since);
}