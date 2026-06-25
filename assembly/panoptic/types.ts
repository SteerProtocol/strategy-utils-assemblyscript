@serializable
export class PanopticContextDto {
  chainId: string = "";
  sourceId: string = "";
  blockNumber: string = "";
  account: string = "";
  panopticSubgraphId: string = "";
  rpcUrl: string = "";
}

@serializable
export class PanopticSourceMetaDto {
  chainId: string = "";
  blockNumber: string = "";
  preflightBlockNumber: string = "";
  rpcSourceId: string = "";
  subgraphSourceId: string = "";
  subgraphBlockNumber: string = "";
  blockNumberRole: string = "";
  reconciled: bool = false;
}

@serializable
export class PanopticEmptyArgsDto {}

@serializable
export class PanopticErrorDto {
  code: string = "";
  message: string = "";
}

@serializable
export class PanopticStringEnvelopeDto {
  ok: bool = false;
  result: string = "";
}

@serializable
export class PanopticStringArrayEnvelopeDto {
  ok: bool = false;
  result: string[] = [];
}

@serializable
export class PanopticPoolMetadataDto {
  poolKeyBytes: string = "";
  poolId: string = "";
  collateralToken0Address: string = "";
  collateralToken1Address: string = "";
  riskEngineAddress: string = "";
  token0Asset: string = "";
  token1Asset: string = "";
  token0Symbol: string = "";
  token1Symbol: string = "";
  token0Decimals: string = "";
  token1Decimals: string = "";
  token0Name: string = "";
  token1Name: string = "";
  underlyingPoolId: string = "";
  isV4: bool = false;
  tickSpacing: string = "";
  fee: string = "";
  sfpmAddress: string = "";
}

@serializable
export class PanopticPoolAddressesDto {
  collateralToken0: string = "";
  collateralToken1: string = "";
}

@serializable
export class PanopticPoolReadArgsDto {
  poolAddress: string = "";
  poolMetadata: PanopticPoolMetadataDto | null = null;
  stateViewAddress: string = "";
}

@serializable
export class PanopticPoolReadRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: PanopticPoolReadArgsDto = new PanopticPoolReadArgsDto();
}

@serializable
export class PanopticPoolResultDto {
  poolId: string = "";
  token0: string = "";
  token1: string = "";
  currentTick: string = "";
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class PanopticPoolEnvelopeDto {
  ok: bool = false;
  result: PanopticPoolResultDto = new PanopticPoolResultDto();
}

@serializable
export class PoolGetTickSpacingArgsDto {
  feeBps: string = "";
}

@serializable
export class PoolGetTickSpacingRequestDto {
  args: PoolGetTickSpacingArgsDto = new PoolGetTickSpacingArgsDto();
}

@serializable
export class PoolGetPricesAtTickArgsDto {
  tick: string = "";
  decimals0: string = "";
  decimals1: string = "";
  precision: string = "";
}

@serializable
export class PoolGetPricesAtTickRequestDto {
  args: PoolGetPricesAtTickArgsDto = new PoolGetPricesAtTickArgsDto();
}

@serializable
export class PoolPricesAtTickResultDto {
  price0: string = "";
  price1: string = "";
}

@serializable
export class PoolPricesAtTickEnvelopeDto {
  ok: bool = false;
  result: PoolPricesAtTickResultDto = new PoolPricesAtTickResultDto();
}

@serializable
export class PoolRiskParametersArgsDto {
  poolAddress: string = "";
  builderCode: string = "";
  riskEngineAddress: string = "";
}

@serializable
export class PoolRiskParametersRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: PoolRiskParametersArgsDto = new PoolRiskParametersArgsDto();
}

@serializable
export class PoolUtilizationArgsDto {
  poolAddress: string = "";
  collateralAddresses: PanopticPoolAddressesDto = new PanopticPoolAddressesDto();
}

@serializable
export class PoolUtilizationRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: PoolUtilizationArgsDto = new PoolUtilizationArgsDto();
}

@serializable
export class PoolMetadataEnvelopeDto {
  ok: bool = false;
  result: PanopticPoolMetadataDto = new PanopticPoolMetadataDto();
}

@serializable
export class AccountBaseArgsDto {
  poolAddress: string = "";
  poolMetadata: PanopticPoolMetadataDto | null = null;
}

@serializable
export class AccountTokenIdArgsDto extends AccountBaseArgsDto {
  tokenId: string = "";
  atTick: string = "";
}

@serializable
export class AccountTokenIdsArgsDto extends AccountBaseArgsDto {
  tokenIds: string[] = [];
  queryAddress: string = "";
  atTick: string = "";
  atTicks: string[] = [];
  includePendingPremium: bool = false;
}

@serializable
export class AccountOpenPositionIdsArgsDto extends AccountBaseArgsDto {
  lastDispatchTxHash: string = "";
}

@serializable
export class AccountCollateralArgsDto extends AccountBaseArgsDto {
  collateralAddresses: PanopticPoolAddressesDto = new PanopticPoolAddressesDto();
}

@serializable
export class AccountTokenIdRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: AccountTokenIdArgsDto = new AccountTokenIdArgsDto();
}

@serializable
export class AccountTokenIdsRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: AccountTokenIdsArgsDto = new AccountTokenIdsArgsDto();
}

@serializable
export class AccountOpenPositionIdsRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: AccountOpenPositionIdsArgsDto = new AccountOpenPositionIdsArgsDto();
}

@serializable
export class AccountCollateralRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: AccountCollateralArgsDto = new AccountCollateralArgsDto();
}

@serializable
export class AccountPositionDto {
  tokenId: string = "";
  positionSize: string = "";
  tickAtMint: string = "";
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class AccountPositionEnvelopeDto {
  ok: bool = false;
  result: AccountPositionDto = new AccountPositionDto();
}

@serializable
export class AccountPositionsResultDto {
  positions: AccountPositionDto[] = [];
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class AccountPositionsEnvelopeDto {
  ok: bool = false;
  result: AccountPositionsResultDto = new AccountPositionsResultDto();
}

@serializable
export class AccountOpenPositionIdsResultDto {
  tokenIds: string[] = [];
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class AccountOpenPositionIdsEnvelopeDto {
  ok: bool = false;
  result: AccountOpenPositionIdsResultDto = new AccountOpenPositionIdsResultDto();
}

@serializable
export class TokenIdLegDto {
  index: string = "";
  asset: string = "";
  optionRatio: string = "";
  isLong: bool = false;
  tokenType: string = "";
  riskPartner: string = "";
  strike: string = "";
  width: string = "";
  tickLower: string = "";
  tickUpper: string = "";
}

@serializable
export class GreeksPositionInputDto {
  tokenId: string = "";
  legs: TokenIdLegDto[] = [];
  tickAtMint: string = "";
  positionSize: string = "";
}

@serializable
export class GreeksCalculatePositionArgsDto {
  legs: TokenIdLegDto[] = [];
  currentTick: string = "";
  mintTick: string = "";
  positionSize: string = "";
  poolTickSpacing: string = "";
  swapAtMint: bool = false;
}

@serializable
export class GreeksCalculatePositionRequestDto {
  args: GreeksCalculatePositionArgsDto = new GreeksCalculatePositionArgsDto();
}

@serializable
export class GreeksCalculateAccountArgsDto {
  positions: GreeksPositionInputDto[] = [];
  tickSpacing: string = "";
  atTicks: string[] = [];
  collateralAssets: string[] = [];
}

@serializable
export class GreeksCalculateAccountRequestDto {
  args: GreeksCalculateAccountArgsDto = new GreeksCalculateAccountArgsDto();
}

@serializable
export class GreeksResultDto {
  value: string = "";
  delta: string = "";
  gamma: string = "";
  totalValue: string[] = [];
  positionCount: string = "";
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class GreeksEnvelopeDto {
  ok: bool = false;
  result: GreeksResultDto = new GreeksResultDto();
}

@serializable
export class DynamicJobFragmentDto {
  target: string = "";
  userProvidedData: string = "";
  strategyProvidedData: string = "";
  value: string = "0";
}

@serializable
export class DynamicJobFragmentEnvelopeDto {
  ok: bool = false;
  result: DynamicJobFragmentDto = new DynamicJobFragmentDto();
}

@serializable
export class CalldataPartsDto {
  functionName: string = "";
  calldata: string = "";
  userProvidedData: string = "";
  strategyProvidedData: string = "";
  value: string = "0";
}

@serializable
export class CalldataPartsEnvelopeDto {
  ok: bool = false;
  result: CalldataPartsDto = new CalldataPartsDto();
}

@serializable
export class PanopticDispatchArgsDto {
  poolAddress: string = "";
  existingPositionIds: string[] = [];
  tokenId: string = "";
  positionSize: string = "";
  tickLimitLow: string = "";
  tickLimitHigh: string = "";
  spreadLimit: string = "";
  swapAtMint: bool = false;
  usePremiaAsCollateral: bool = false;
  builderCode: string = "";
}

@serializable
export class PanopticDispatchRequestDto {
  args: PanopticDispatchArgsDto = new PanopticDispatchArgsDto();
}

@serializable
export class PanopticDispatchExplicitArgsDto {
  poolAddress: string = "";
  positionIdList: string[] = [];
  finalPositionIdList: string[] = [];
  positionSizes: string[] = [];
  tickAndSpreadLimits: string[][] = [];
  usePremiaAsCollateral: bool = false;
  builderCode: string = "";
}

@serializable
export class PanopticDispatchExplicitRequestDto {
  args: PanopticDispatchExplicitArgsDto = new PanopticDispatchExplicitArgsDto();
}

@serializable
export class Erc20ApproveFragmentArgsDto {
  token: string = "";
  spender: string = "";
  amount: string = "";
}

@serializable
export class Erc20ApproveFragmentRequestDto {
  args: Erc20ApproveFragmentArgsDto = new Erc20ApproveFragmentArgsDto();
}

@serializable
export class Permit2ApproveFragmentArgsDto {
  permit2: string = "";
  token: string = "";
  spender: string = "";
  amount: string = "";
  expiration: string = "";
}

@serializable
export class Permit2ApproveFragmentRequestDto {
  args: Permit2ApproveFragmentArgsDto = new Permit2ApproveFragmentArgsDto();
}

@serializable
export class CollateralDepositFragmentArgsDto {
  collateralTracker: string = "";
  assets: string = "";
  receiver: string = "";
}

@serializable
export class CollateralDepositFragmentRequestDto {
  args: CollateralDepositFragmentArgsDto = new CollateralDepositFragmentArgsDto();
}

@serializable
export class CollateralWithdrawFragmentArgsDto {
  collateralTracker: string = "";
  assets: string = "";
  receiver: string = "";
  owner: string = "";
}

@serializable
export class CollateralWithdrawFragmentRequestDto {
  args: CollateralWithdrawFragmentArgsDto = new CollateralWithdrawFragmentArgsDto();
}

@serializable
export class CollateralWithdrawWithPositionsFragmentArgsDto extends CollateralWithdrawFragmentArgsDto {
  positionIdList: string[] = [];
  usePremiaAsCollateral: bool = false;
}

@serializable
export class CollateralWithdrawWithPositionsFragmentRequestDto {
  args: CollateralWithdrawWithPositionsFragmentArgsDto = new CollateralWithdrawWithPositionsFragmentArgsDto();
}

@serializable
export class WethAmountArgsDto {
  amount: string = "";
}

@serializable
export class WethAmountRequestDto {
  args: WethAmountArgsDto = new WethAmountArgsDto();
}

@serializable
export class HypovaultWethInnerCallArgsDto {
  weth: string = "";
  amount: string = "";
}

@serializable
export class HypovaultWethInnerCallRequestDto {
  args: HypovaultWethInnerCallArgsDto = new HypovaultWethInnerCallArgsDto();
}

@serializable
export class HypovaultInnerCallDto {
  functionName: string = "";
  target: string = "";
  data: string = "";
  value: string = "";
}

@serializable
export class HypovaultInnerCallEnvelopeDto {
  ok: bool = false;
  result: HypovaultInnerCallDto = new HypovaultInnerCallDto();
}

@serializable
export class HypovaultFulfillDepositsArgsDto {
  vaultManager: string = "";
  assetsToFulfill: string = "";
  managerInput: string = "";
}

@serializable
export class HypovaultFulfillDepositsRequestDto {
  args: HypovaultFulfillDepositsArgsDto = new HypovaultFulfillDepositsArgsDto();
}

@serializable
export class HypovaultFulfillWithdrawalsArgsDto {
  vaultManager: string = "";
  sharesToFulfill: string = "";
  maxAssetsReceived: string = "";
  managerInput: string = "";
}

@serializable
export class HypovaultFulfillWithdrawalsRequestDto {
  args: HypovaultFulfillWithdrawalsArgsDto = new HypovaultFulfillWithdrawalsArgsDto();
}

@serializable
export class HypovaultManageCalldataPartsArgsDto {
  innerTarget: string = "";
  innerData: string = "";
  value: string = "";
}

@serializable
export class HypovaultManageCalldataPartsRequestDto {
  args: HypovaultManageCalldataPartsArgsDto = new HypovaultManageCalldataPartsArgsDto();
}

@serializable
export class HypovaultManageArgsDto extends HypovaultManageCalldataPartsArgsDto {
  manager: string = "";
}

@serializable
export class HypovaultManageRequestDto {
  args: HypovaultManageArgsDto = new HypovaultManageArgsDto();
}

@serializable
export class HypovaultPoolInfoDto {
  pool: string = "";
  token0: string = "";
  token1: string = "";
  maxPriceDeviation: i32 = 0;
}

@serializable
export class HypovaultBuildVaultManagerInputArgsDto {
  vaultAddress: string = "";
  underlyingToken: string = "";
  poolInfos: HypovaultPoolInfoDto[] = [];
  tokenIds: string[][] = [];
  wethAddress: string = "";
  erc4626Vaults: string[] = [];
}

@serializable
export class HypovaultBuildVaultManagerInputRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: HypovaultBuildVaultManagerInputArgsDto = new HypovaultBuildVaultManagerInputArgsDto();
}

@serializable
export class HypovaultBuildVaultManagerInputResultDto {
  managerInput: string = "";
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class HypovaultBuildVaultManagerInputEnvelopeDto {
  ok: bool = false;
  result: HypovaultBuildVaultManagerInputResultDto = new HypovaultBuildVaultManagerInputResultDto();
}

@serializable
export class HypovaultCandidatesByPoolDto {
  poolAddress: string = "";
  candidates: string[] = [];
}

@serializable
export class HypovaultVerifyOpenTokenIdsArgsDto {
  vaultAddress: string = "";
  candidatesByPool: HypovaultCandidatesByPoolDto[] = [];
}

@serializable
export class HypovaultVerifyOpenTokenIdsRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: HypovaultVerifyOpenTokenIdsArgsDto = new HypovaultVerifyOpenTokenIdsArgsDto();
}

@serializable
export class HypovaultVerifyOpenTokenIdsResultDto {
  tokenIdsByPool: string[][] = [];
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class HypovaultVerifyOpenTokenIdsEnvelopeDto {
  ok: bool = false;
  result: HypovaultVerifyOpenTokenIdsResultDto = new HypovaultVerifyOpenTokenIdsResultDto();
}

@serializable
export class HypovaultEpochContextArgsDto {
  vaultAddress: string = "";
  account: string = "";
}

@serializable
export class HypovaultEpochContextRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: HypovaultEpochContextArgsDto = new HypovaultEpochContextArgsDto();
}

@serializable
export class HypovaultDepositSnapshotDto {
  epoch: string = "";
  assetsDeposited: string = "";
  assetsFulfilled: string = "";
  sharesReceived: string = "";
  pendingValue: string = "";
  queuedDeposit: string = "";
}

@serializable
export class HypovaultQueuedWithdrawalDto {
  amount: string = "";
  basis: string = "";
  shouldRedeposit: bool = false;
}

@serializable
export class HypovaultWithdrawalSnapshotDto {
  epoch: string = "";
  sharesWithdrawn: string = "";
  sharesFulfilled: string = "";
  assetsPaid: string = "";
  pendingShares: string = "";
  queuedWithdrawal: HypovaultQueuedWithdrawalDto = new HypovaultQueuedWithdrawalDto();
}

@serializable
export class HypovaultEpochContextResultDto {
  vaultAddress: string = "";
  account: string = "";
  totalSupply: string = "";
  currentTimestamp: string = "";
  deposit: HypovaultDepositSnapshotDto = new HypovaultDepositSnapshotDto();
  withdrawal: HypovaultWithdrawalSnapshotDto = new HypovaultWithdrawalSnapshotDto();
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class HypovaultEpochContextEnvelopeDto {
  ok: bool = false;
  result: HypovaultEpochContextResultDto = new HypovaultEpochContextResultDto();
}

@serializable
export class HypovaultPositionsHashStatusArgsDto {
  poolAddress: string = "";
  tokenIds: string[] = [];
}

@serializable
export class HypovaultPositionsHashStatusRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: HypovaultPositionsHashStatusArgsDto = new HypovaultPositionsHashStatusArgsDto();
}

@serializable
export class HypovaultPositionsHashStatusResultDto {
  account: string = "";
  poolAddress: string = "";
  positionsHash: string = "";
  tokenIds: string[] = [];
  computedHash: string = "";
  valid: bool = false;
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class HypovaultPositionsHashStatusEnvelopeDto {
  ok: bool = false;
  result: HypovaultPositionsHashStatusResultDto = new HypovaultPositionsHashStatusResultDto();
}

@serializable
export class MerkleLeafDto {
  Action: string = "";
  Description: string = "";
  LeafDigest: string = "";
  DecoderAndSanitizerAddress: string = "";
  TargetAddress: string = "";
  FunctionSignature: string = "";
  FunctionSelector: string = "";
  CanSendValue: bool = false;
}

@serializable
export class MerkleArtifactDto {
  leafs: MerkleLeafDto[] = [];
  proofsByAction: Map<string, string[]> = new Map<string, string[]>();
  proofsByDigest: Map<string, string[]> = new Map<string, string[]>();
}

@serializable
export class MerkleFindLeafArgsDto {
  artifact: MerkleArtifactDto = new MerkleArtifactDto();
  description: string = "";
}

@serializable
export class MerkleFindLeafRequestDto {
  args: MerkleFindLeafArgsDto = new MerkleFindLeafArgsDto();
}

@serializable
export class MerkleFoundLeafDto {
  action: string = "";
  description: string = "";
  leafDigest: string = "";
  decoder: string = "";
  target: string = "";
  functionSignature: string = "";
  functionSelector: string = "";
  canSendValue: bool = false;
  proof: string[] = [];
}

@serializable
export class MerkleFindLeafEnvelopeDto {
  ok: bool = false;
  result: MerkleFoundLeafDto = new MerkleFoundLeafDto();
}

@serializable
export class MerkleBuildManageActionDto {
  description: string = "";
  data: string = "";
  value: string = "";
}

@serializable
export class MerkleBuildManageArgsDto {
  artifact: MerkleArtifactDto = new MerkleArtifactDto();
  actions: MerkleBuildManageActionDto[] = [];
}

@serializable
export class MerkleBuildManageRequestDto {
  args: MerkleBuildManageArgsDto = new MerkleBuildManageArgsDto();
}

@serializable
export class MerkleBuildManageResultDto {
  proofs: string[][] = [];
  decoders: string[] = [];
  innerTargets: string[] = [];
  innerDatas: string[] = [];
  values: string[] = [];
  leaves: MerkleFoundLeafDto[] = [];
}

@serializable
export class MerkleBuildManageEnvelopeDto {
  ok: bool = false;
  result: MerkleBuildManageResultDto = new MerkleBuildManageResultDto();
}

@serializable
export class MerkleManageVaultWithVerificationFragmentArgsDto {
  manager: string = "";
  proofs: string[][] = [];
  decoders: string[] = [];
  innerTargets: string[] = [];
  innerDatas: string[] = [];
  values: string[] = [];
}

@serializable
export class MerkleManageVaultWithVerificationFragmentRequestDto {
  args: MerkleManageVaultWithVerificationFragmentArgsDto = new MerkleManageVaultWithVerificationFragmentArgsDto();
}

@serializable
export class UniswapAddressesDto {
  universalRouter: string = "";
  quoter: string = "";
  permit2: string = "";
  weth: string = "";
}

@serializable
export class UniswapRouteArgsDto {
  poolAddress: string = "";
  tokenIn: string = "";
  amountIn: string = "";
  amountOut: string = "";
  slippageBps: string = "";
  addresses: UniswapAddressesDto | null = null;
}

@serializable
export class UniswapRouteRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: UniswapRouteArgsDto = new UniswapRouteArgsDto();
}

@serializable
export class UniswapQuoteResultDto {
  success: bool = false;
  amountIn: string = "";
  amountOut: string = "";
  tokenIn: string = "";
  tokenOut: string = "";
  zeroForOne: bool = false;
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class UniswapQuoteEnvelopeDto {
  ok: bool = false;
  result: UniswapQuoteResultDto = new UniswapQuoteResultDto();
}

@serializable
export class UniswapRouterApprovalArgsDto {
  tokenIn: string = "";
  owner: string = "";
  amount: string = "";
  addresses: UniswapAddressesDto | null = null;
}

@serializable
export class UniswapRouterApprovalRequestDto {
  context: PanopticContextDto = new PanopticContextDto();
  args: UniswapRouterApprovalArgsDto = new UniswapRouterApprovalArgsDto();
}

@serializable
export class UniswapRouterApprovalResultDto {
  needsErc20Approval: bool = false;
  needsPermit2Approval: bool = false;
  source: PanopticSourceMetaDto | null = null;
}

@serializable
export class UniswapRouterApprovalEnvelopeDto {
  ok: bool = false;
  result: UniswapRouterApprovalResultDto = new UniswapRouterApprovalResultDto();
}

@serializable
export class UniswapV3ExactInArgsDto {
  router: string = "";
  tokenIn: string = "";
  tokenOut: string = "";
  fee: string = "";
  recipient: string = "";
  amountIn: string = "";
  amountOutMin: string = "";
  payerIsUser: bool = false;
  deadline: string = "";
}

@serializable
export class UniswapV3ExactInRequestDto {
  args: UniswapV3ExactInArgsDto = new UniswapV3ExactInArgsDto();
}

@serializable
export class DynamicJobsRenderArgsDto {
  fragments: DynamicJobFragmentDto[] = [];
}

@serializable
export class DynamicJobsRenderRequestDto {
  args: DynamicJobsRenderArgsDto = new DynamicJobsRenderArgsDto();
}

@serializable
export class DynamicJobsExecutePayloadDto {
  functionName: string = "";
  typesArray: string[] = [];
  valuesArray: string[][] = [];
}

@serializable
export class DynamicJobsRenderEnvelopeDto {
  ok: bool = false;
  result: DynamicJobsExecutePayloadDto = new DynamicJobsExecutePayloadDto();
}

@serializable
export class PanopticSdkRecordResultDto {
  source: PanopticSourceMetaDto | null = null;
  poolId: string = "";
  tokenId: string = "";
  value: string = "";
  balance0: string = "";
  balance1: string = "";
  utilization0: string = "";
  utilization1: string = "";
  currentTick: string = "";
  oracleTick: string = "";
  lower: string = "";
  upper: string = "";
}

@serializable
export class PanopticSdkRecordEnvelopeDto {
  ok: bool = false;
  result: PanopticSdkRecordResultDto = new PanopticSdkRecordResultDto();
}
