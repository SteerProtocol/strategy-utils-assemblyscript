import { JSON } from 'json-as/assembly';
import { ExecutionContext } from "./ExecutionContext";

@serializable
export class DataConnectorConfig {
  executionContext: ExecutionContext = new ExecutionContext();
}