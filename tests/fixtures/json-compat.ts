import { JSON } from "json-as/assembly";
import { MerkleArtifactDto } from "../../assembly/panoptic/types";
import { parsePrices } from "../../assembly/utils/types/Price";

export function parseStringifiedPrices(): string {
  const prices = parsePrices('{"data":[[{"high":"123.4","low":"120.1","open":"121.2","close":"122.3"},{"high":124.5,"low":121.2,"open":122.3,"close":123.4}]]}');

  if (prices.length != 2) {
    return "bad-length:" + prices.length.toString();
  }

  if (prices[0].high < 123.39 || prices[0].high > 123.41) {
    return "bad-string-high:" + prices[0].high.toString();
  }

  if (prices[0].close < 122.29 || prices[0].close > 122.31) {
    return "bad-string-close:" + prices[0].close.toString();
  }

  if (prices[1].high < 124.49 || prices[1].high > 124.51) {
    return "bad-number-high:" + prices[1].high.toString();
  }

  return "ok";
}

export function roundTripMerkleProofActions(input: string): string {
  const artifact = JSON.parse<MerkleArtifactDto>(input);
  return JSON.stringify<Map<string, string[]>>(artifact.proofsByAction);
}
