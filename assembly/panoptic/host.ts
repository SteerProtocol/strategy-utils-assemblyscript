import { JSON } from "json-as/assembly";
import { PanopticMethods } from "./methods";
import {
  AccountCollateralRequestDto,
  AccountOpenPositionIdsEnvelopeDto,
  AccountOpenPositionIdsRequestDto,
  AccountPositionEnvelopeDto,
  AccountPositionsEnvelopeDto,
  AccountTokenIdRequestDto,
  AccountTokenIdsRequestDto,
  CalldataPartsEnvelopeDto,
  CollateralDepositFragmentRequestDto,
  CollateralWithdrawFragmentRequestDto,
  CollateralWithdrawWithPositionsFragmentRequestDto,
  DynamicJobFragmentEnvelopeDto,
  DynamicJobsRenderEnvelopeDto,
  DynamicJobsRenderRequestDto,
  Erc20ApproveFragmentRequestDto,
  GreeksCalculateAccountRequestDto,
  GreeksCalculatePositionRequestDto,
  GreeksEnvelopeDto,
  HypovaultBuildVaultManagerInputEnvelopeDto,
  HypovaultBuildVaultManagerInputRequestDto,
  HypovaultEpochContextEnvelopeDto,
  HypovaultEpochContextRequestDto,
  HypovaultFulfillDepositsRequestDto,
  HypovaultFulfillWithdrawalsRequestDto,
  HypovaultInnerCallEnvelopeDto,
  HypovaultManageCalldataPartsRequestDto,
  HypovaultManageRequestDto,
  HypovaultPositionsHashStatusEnvelopeDto,
  HypovaultPositionsHashStatusRequestDto,
  HypovaultVerifyOpenTokenIdsEnvelopeDto,
  HypovaultVerifyOpenTokenIdsRequestDto,
  HypovaultWethInnerCallRequestDto,
  MerkleBuildManageEnvelopeDto,
  MerkleBuildManageRequestDto,
  MerkleFindLeafEnvelopeDto,
  MerkleFindLeafRequestDto,
  MerkleManageVaultWithVerificationFragmentRequestDto,
  PanopticDispatchExplicitRequestDto,
  PanopticDispatchRequestDto,
  PanopticPoolEnvelopeDto,
  PanopticPoolReadRequestDto,
  PanopticSdkRecordEnvelopeDto,
  PanopticStringEnvelopeDto,
  Permit2ApproveFragmentRequestDto,
  PoolGetPricesAtTickRequestDto,
  PoolGetTickSpacingRequestDto,
  PoolMetadataEnvelopeDto,
  PoolPricesAtTickEnvelopeDto,
  PoolRiskParametersRequestDto,
  PoolUtilizationRequestDto,
  UniswapQuoteEnvelopeDto,
  UniswapRouteRequestDto,
  UniswapRouterApprovalEnvelopeDto,
  UniswapRouterApprovalRequestDto,
  UniswapV3ExactInRequestDto,
  WethAmountRequestDto,
} from "./types";

@external("env", "panoptic_call")
declare function panoptic_call(method: string, paramsJson: string): string;

export function callPanopticRaw(method: string, requestJson: string): string {
  return panoptic_call(method, requestJson);
}

export function callPanoptic<TRequest, TEnvelope>(method: string, request: TRequest): TEnvelope {
  return JSON.parse<TEnvelope>(panoptic_call(method, JSON.stringify<TRequest>(request)));
}

export function assertPanopticOk(ok: bool, method: string): void {
  if (!ok) {
    throw new Error("Panoptic call failed: " + method);
  }
}

export function accountGetAccountCollateral(request: AccountCollateralRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<AccountCollateralRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.ACCOUNT_GET_ACCOUNT_COLLATERAL, request);
}

export function accountGetAccountSummaryBasic(request: AccountTokenIdsRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<AccountTokenIdsRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.ACCOUNT_GET_ACCOUNT_SUMMARY_BASIC, request);
}

export function accountGetAccountSummaryRisk(request: AccountTokenIdsRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<AccountTokenIdsRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.ACCOUNT_GET_ACCOUNT_SUMMARY_RISK, request);
}

export function accountGetLiquidationPrices(request: AccountTokenIdsRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<AccountTokenIdsRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.ACCOUNT_GET_LIQUIDATION_PRICES, request);
}

export function accountGetNetLiquidationValue(request: AccountTokenIdsRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<AccountTokenIdsRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.ACCOUNT_GET_NET_LIQUIDATION_VALUE, request);
}

export function accountGetNetLiquidationValues(request: AccountTokenIdsRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<AccountTokenIdsRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.ACCOUNT_GET_NET_LIQUIDATION_VALUES, request);
}

export function accountGetOpenPositionIds(request: AccountOpenPositionIdsRequestDto): AccountOpenPositionIdsEnvelopeDto {
  return callPanoptic<AccountOpenPositionIdsRequestDto, AccountOpenPositionIdsEnvelopeDto>(PanopticMethods.ACCOUNT_GET_OPEN_POSITION_IDS, request);
}

export function accountGetPosition(request: AccountTokenIdRequestDto): AccountPositionEnvelopeDto {
  return callPanoptic<AccountTokenIdRequestDto, AccountPositionEnvelopeDto>(PanopticMethods.ACCOUNT_GET_POSITION, request);
}

export function accountGetPositions(request: AccountTokenIdsRequestDto): AccountPositionsEnvelopeDto {
  return callPanoptic<AccountTokenIdsRequestDto, AccountPositionsEnvelopeDto>(PanopticMethods.ACCOUNT_GET_POSITIONS, request);
}

export function collateralDepositFragment(request: CollateralDepositFragmentRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<CollateralDepositFragmentRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.COLLATERAL_DEPOSIT_FRAGMENT, request);
}

export function collateralWithdrawFragment(request: CollateralWithdrawFragmentRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<CollateralWithdrawFragmentRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.COLLATERAL_WITHDRAW_FRAGMENT, request);
}

export function collateralWithdrawWithPositionsFragment(request: CollateralWithdrawWithPositionsFragmentRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<CollateralWithdrawWithPositionsFragmentRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.COLLATERAL_WITHDRAW_WITH_POSITIONS_FRAGMENT, request);
}

export function dynamicJobsRenderExecuteJob(request: DynamicJobsRenderRequestDto): DynamicJobsRenderEnvelopeDto {
  return callPanoptic<DynamicJobsRenderRequestDto, DynamicJobsRenderEnvelopeDto>(PanopticMethods.DYNAMIC_JOBS_RENDER_EXECUTE_JOB, request);
}

export function erc20ApproveFragment(request: Erc20ApproveFragmentRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<Erc20ApproveFragmentRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.ERC20_APPROVE_FRAGMENT, request);
}

export function greeksCalculateAccountGreeksPure(request: GreeksCalculateAccountRequestDto): GreeksEnvelopeDto {
  return callPanoptic<GreeksCalculateAccountRequestDto, GreeksEnvelopeDto>(PanopticMethods.GREEKS_CALCULATE_ACCOUNT_GREEKS_PURE, request);
}

export function greeksCalculatePositionGreeks(request: GreeksCalculatePositionRequestDto): GreeksEnvelopeDto {
  return callPanoptic<GreeksCalculatePositionRequestDto, GreeksEnvelopeDto>(PanopticMethods.GREEKS_CALCULATE_POSITION_GREEKS, request);
}

export function greeksGetPositionGreeks(request: AccountTokenIdRequestDto): GreeksEnvelopeDto {
  return callPanoptic<AccountTokenIdRequestDto, GreeksEnvelopeDto>(PanopticMethods.GREEKS_GET_POSITION_GREEKS, request);
}

export function hypovaultBuildVaultManagerInputAtBlock(request: HypovaultBuildVaultManagerInputRequestDto): HypovaultBuildVaultManagerInputEnvelopeDto {
  return callPanoptic<HypovaultBuildVaultManagerInputRequestDto, HypovaultBuildVaultManagerInputEnvelopeDto>(PanopticMethods.HYPOVAULT_BUILD_VAULT_MANAGER_INPUT_AT_BLOCK, request);
}

export function hypovaultFulfillDepositsFragment(request: HypovaultFulfillDepositsRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<HypovaultFulfillDepositsRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.HYPOVAULT_FULFILL_DEPOSITS_FRAGMENT, request);
}

export function hypovaultFulfillWithdrawalsFragment(request: HypovaultFulfillWithdrawalsRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<HypovaultFulfillWithdrawalsRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.HYPOVAULT_FULFILL_WITHDRAWALS_FRAGMENT, request);
}

export function hypovaultGetEpochContext(request: HypovaultEpochContextRequestDto): HypovaultEpochContextEnvelopeDto {
  return callPanoptic<HypovaultEpochContextRequestDto, HypovaultEpochContextEnvelopeDto>(PanopticMethods.HYPOVAULT_GET_EPOCH_CONTEXT, request);
}

export function hypovaultGetOpenPositionIds(request: AccountOpenPositionIdsRequestDto): AccountOpenPositionIdsEnvelopeDto {
  return callPanoptic<AccountOpenPositionIdsRequestDto, AccountOpenPositionIdsEnvelopeDto>(PanopticMethods.HYPOVAULT_GET_OPEN_POSITION_IDS, request);
}

export function hypovaultGetPositionsHashStatus(request: HypovaultPositionsHashStatusRequestDto): HypovaultPositionsHashStatusEnvelopeDto {
  return callPanoptic<HypovaultPositionsHashStatusRequestDto, HypovaultPositionsHashStatusEnvelopeDto>(PanopticMethods.HYPOVAULT_GET_POSITIONS_HASH_STATUS, request);
}

export function hypovaultManageCalldataParts(request: HypovaultManageCalldataPartsRequestDto): CalldataPartsEnvelopeDto {
  return callPanoptic<HypovaultManageCalldataPartsRequestDto, CalldataPartsEnvelopeDto>(PanopticMethods.HYPOVAULT_MANAGE_CALLDATA_PARTS, request);
}

export function hypovaultManageFragment(request: HypovaultManageRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<HypovaultManageRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.HYPOVAULT_MANAGE_FRAGMENT, request);
}

export function hypovaultVerifyVaultOpenTokenIdsAtBlock(request: HypovaultVerifyOpenTokenIdsRequestDto): HypovaultVerifyOpenTokenIdsEnvelopeDto {
  return callPanoptic<HypovaultVerifyOpenTokenIdsRequestDto, HypovaultVerifyOpenTokenIdsEnvelopeDto>(PanopticMethods.HYPOVAULT_VERIFY_VAULT_OPEN_TOKEN_IDS_AT_BLOCK, request);
}

export function hypovaultWethDepositInnerCall(request: HypovaultWethInnerCallRequestDto): HypovaultInnerCallEnvelopeDto {
  return callPanoptic<HypovaultWethInnerCallRequestDto, HypovaultInnerCallEnvelopeDto>(PanopticMethods.HYPOVAULT_WETH_DEPOSIT_INNER_CALL, request);
}

export function hypovaultWethWithdrawInnerCall(request: HypovaultWethInnerCallRequestDto): HypovaultInnerCallEnvelopeDto {
  return callPanoptic<HypovaultWethInnerCallRequestDto, HypovaultInnerCallEnvelopeDto>(PanopticMethods.HYPOVAULT_WETH_WITHDRAW_INNER_CALL, request);
}

export function merkleBuildManageArgs(request: MerkleBuildManageRequestDto): MerkleBuildManageEnvelopeDto {
  return callPanoptic<MerkleBuildManageRequestDto, MerkleBuildManageEnvelopeDto>(PanopticMethods.MERKLE_BUILD_MANAGE_ARGS, request);
}

export function merkleFindLeaf(request: MerkleFindLeafRequestDto): MerkleFindLeafEnvelopeDto {
  return callPanoptic<MerkleFindLeafRequestDto, MerkleFindLeafEnvelopeDto>(PanopticMethods.MERKLE_FIND_LEAF, request);
}

export function merkleManageVaultWithVerificationFragment(request: MerkleManageVaultWithVerificationFragmentRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<MerkleManageVaultWithVerificationFragmentRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.MERKLE_MANAGE_VAULT_WITH_VERIFICATION_FRAGMENT, request);
}

export function panopticDispatchCalldataParts(request: PanopticDispatchRequestDto): CalldataPartsEnvelopeDto {
  return callPanoptic<PanopticDispatchRequestDto, CalldataPartsEnvelopeDto>(PanopticMethods.PANOPTIC_DISPATCH_CALLDATA_PARTS, request);
}

export function panopticDispatchExplicitCalldataParts(request: PanopticDispatchExplicitRequestDto): CalldataPartsEnvelopeDto {
  return callPanoptic<PanopticDispatchExplicitRequestDto, CalldataPartsEnvelopeDto>(PanopticMethods.PANOPTIC_DISPATCH_EXPLICIT_CALLDATA_PARTS, request);
}

export function panopticDispatchExplicitFragment(request: PanopticDispatchExplicitRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<PanopticDispatchExplicitRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.PANOPTIC_DISPATCH_EXPLICIT_FRAGMENT, request);
}

export function panopticDispatchFragment(request: PanopticDispatchRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<PanopticDispatchRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.PANOPTIC_DISPATCH_FRAGMENT, request);
}

export function permit2ApproveFragment(request: Permit2ApproveFragmentRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<Permit2ApproveFragmentRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.PERMIT2_APPROVE_FRAGMENT, request);
}

export function poolFetchPoolId(request: PanopticPoolReadRequestDto): PanopticPoolEnvelopeDto {
  return callPanoptic<PanopticPoolReadRequestDto, PanopticPoolEnvelopeDto>(PanopticMethods.POOL_FETCH_POOL_ID, request);
}

export function poolGetOracleState(request: PanopticPoolReadRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<PanopticPoolReadRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.POOL_GET_ORACLE_STATE, request);
}

export function poolGetPool(request: PanopticPoolReadRequestDto): PanopticPoolEnvelopeDto {
  return callPanoptic<PanopticPoolReadRequestDto, PanopticPoolEnvelopeDto>(PanopticMethods.POOL_GET_POOL, request);
}

export function poolGetPoolMetadata(request: PanopticPoolReadRequestDto): PoolMetadataEnvelopeDto {
  return callPanoptic<PanopticPoolReadRequestDto, PoolMetadataEnvelopeDto>(PanopticMethods.POOL_GET_POOL_METADATA, request);
}

export function poolGetPricesAtTick(request: PoolGetPricesAtTickRequestDto): PoolPricesAtTickEnvelopeDto {
  return callPanoptic<PoolGetPricesAtTickRequestDto, PoolPricesAtTickEnvelopeDto>(PanopticMethods.POOL_GET_PRICES_AT_TICK, request);
}

export function poolGetRiskParameters(request: PoolRiskParametersRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<PoolRiskParametersRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.POOL_GET_RISK_PARAMETERS, request);
}

export function poolGetTickSpacing(request: PoolGetTickSpacingRequestDto): PanopticStringEnvelopeDto {
  return callPanoptic<PoolGetTickSpacingRequestDto, PanopticStringEnvelopeDto>(PanopticMethods.POOL_GET_TICK_SPACING, request);
}

export function poolGetUtilization(request: PoolUtilizationRequestDto): PanopticSdkRecordEnvelopeDto {
  return callPanoptic<PoolUtilizationRequestDto, PanopticSdkRecordEnvelopeDto>(PanopticMethods.POOL_GET_UTILIZATION, request);
}

export function uniswapBuildV3ExactInExecuteCalldataParts(request: UniswapV3ExactInRequestDto): CalldataPartsEnvelopeDto {
  return callPanoptic<UniswapV3ExactInRequestDto, CalldataPartsEnvelopeDto>(PanopticMethods.UNISWAP_BUILD_V3_EXACT_IN_EXECUTE_CALLDATA_PARTS, request);
}

export function uniswapBuildV3ExactInExecuteFragment(request: UniswapV3ExactInRequestDto): DynamicJobFragmentEnvelopeDto {
  return callPanoptic<UniswapV3ExactInRequestDto, DynamicJobFragmentEnvelopeDto>(PanopticMethods.UNISWAP_BUILD_V3_EXACT_IN_EXECUTE_FRAGMENT, request);
}

export function uniswapCheckRouterApproval(request: UniswapRouterApprovalRequestDto): UniswapRouterApprovalEnvelopeDto {
  return callPanoptic<UniswapRouterApprovalRequestDto, UniswapRouterApprovalEnvelopeDto>(PanopticMethods.UNISWAP_CHECK_ROUTER_APPROVAL, request);
}

export function uniswapQuoteSwapExactInViaRouter(request: UniswapRouteRequestDto): UniswapQuoteEnvelopeDto {
  return callPanoptic<UniswapRouteRequestDto, UniswapQuoteEnvelopeDto>(PanopticMethods.UNISWAP_QUOTE_SWAP_EXACT_IN_VIA_ROUTER, request);
}

export function uniswapQuoteSwapExactOutViaRouter(request: UniswapRouteRequestDto): UniswapQuoteEnvelopeDto {
  return callPanoptic<UniswapRouteRequestDto, UniswapQuoteEnvelopeDto>(PanopticMethods.UNISWAP_QUOTE_SWAP_EXACT_OUT_VIA_ROUTER, request);
}

export function uniswapResolveSwapRoute(request: UniswapRouteRequestDto): UniswapQuoteEnvelopeDto {
  return callPanoptic<UniswapRouteRequestDto, UniswapQuoteEnvelopeDto>(PanopticMethods.UNISWAP_RESOLVE_SWAP_ROUTE, request);
}

export function wethDepositCalldataParts(request: WethAmountRequestDto): CalldataPartsEnvelopeDto {
  return callPanoptic<WethAmountRequestDto, CalldataPartsEnvelopeDto>(PanopticMethods.WETH_DEPOSIT_CALLDATA_PARTS, request);
}

export function wethWithdrawCalldataParts(request: WethAmountRequestDto): CalldataPartsEnvelopeDto {
  return callPanoptic<WethAmountRequestDto, CalldataPartsEnvelopeDto>(PanopticMethods.WETH_WITHDRAW_CALLDATA_PARTS, request);
}
