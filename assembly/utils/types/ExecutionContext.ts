import { JSON } from 'json-as/assembly';

@serializable
export class ExecutionContext {
  executionTimestamp: number = 0;
  epochLength: number = 0;
  epochTimestamp: i64 = 0;
  vaultAddress: string = "";
  blockTime: i64 = 0;
  blockNumber: i64 = 0;
}