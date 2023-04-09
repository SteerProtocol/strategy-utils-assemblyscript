import { JSON } from 'json-as/assembly';

@serializable
export class ExecutionContext {
  executionTimestamp: number = 0;
  epochLength: number = 0;
  epochTimestamp: i32 = 0;
  vaultAddress: string = "";
  blockTime: i32 = 0;
  blockNumber: i32 = 0;
}