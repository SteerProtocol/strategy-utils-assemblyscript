export namespace PanopticMethods {
  export const ACCOUNT_GET_ACCOUNT_COLLATERAL = "account.getAccountCollateral";
  export const ACCOUNT_GET_ACCOUNT_SUMMARY_BASIC = "account.getAccountSummaryBasic";
  export const ACCOUNT_GET_ACCOUNT_SUMMARY_RISK = "account.getAccountSummaryRisk";
  export const ACCOUNT_GET_LIQUIDATION_PRICES = "account.getLiquidationPrices";
  export const ACCOUNT_GET_NET_LIQUIDATION_VALUE = "account.getNetLiquidationValue";
  export const ACCOUNT_GET_NET_LIQUIDATION_VALUES = "account.getNetLiquidationValues";
  export const ACCOUNT_GET_OPEN_POSITION_IDS = "account.getOpenPositionIds";
  export const ACCOUNT_GET_POSITION = "account.getPosition";
  export const ACCOUNT_GET_POSITIONS = "account.getPositions";

  export const COLLATERAL_DEPOSIT_FRAGMENT = "collateral.depositFragment";
  export const COLLATERAL_WITHDRAW_FRAGMENT = "collateral.withdrawFragment";
  export const COLLATERAL_WITHDRAW_WITH_POSITIONS_FRAGMENT = "collateral.withdrawWithPositionsFragment";

  export const DYNAMIC_JOBS_RENDER_EXECUTE_JOB = "dynamicJobs.renderExecuteJob";
  export const ERC20_APPROVE_FRAGMENT = "erc20.approveFragment";

  export const GREEKS_CALCULATE_ACCOUNT_GREEKS_PURE = "greeks.calculateAccountGreeksPure";
  export const GREEKS_CALCULATE_POSITION_GREEKS = "greeks.calculatePositionGreeks";
  export const GREEKS_GET_POSITION_GREEKS = "greeks.getPositionGreeks";

  export const HYPOVAULT_BUILD_VAULT_MANAGER_INPUT_AT_BLOCK = "hypovault.buildVaultManagerInputAtBlock";
  export const HYPOVAULT_FULFILL_DEPOSITS_FRAGMENT = "hypovault.fulfillDepositsFragment";
  export const HYPOVAULT_FULFILL_WITHDRAWALS_FRAGMENT = "hypovault.fulfillWithdrawalsFragment";
  export const HYPOVAULT_GET_EPOCH_CONTEXT = "hypovault.getEpochContext";
  export const HYPOVAULT_GET_OPEN_POSITION_IDS = "hypovault.getOpenPositionIds";
  export const HYPOVAULT_GET_POSITIONS_HASH_STATUS = "hypovault.getPositionsHashStatus";
  export const HYPOVAULT_MANAGE_CALLDATA_PARTS = "hypovault.manageCalldataParts";
  export const HYPOVAULT_MANAGE_FRAGMENT = "hypovault.manageFragment";
  export const HYPOVAULT_VERIFY_VAULT_OPEN_TOKEN_IDS_AT_BLOCK = "hypovault.verifyVaultOpenTokenIdsAtBlock";
  export const HYPOVAULT_WETH_DEPOSIT_INNER_CALL = "hypovault.wethDepositInnerCall";
  export const HYPOVAULT_WETH_WITHDRAW_INNER_CALL = "hypovault.wethWithdrawInnerCall";

  export const MERKLE_BUILD_MANAGE_ARGS = "merkle.buildManageArgs";
  export const MERKLE_FIND_LEAF = "merkle.findLeaf";
  export const MERKLE_MANAGE_VAULT_WITH_VERIFICATION_FRAGMENT = "merkle.manageVaultWithVerificationFragment";

  export const PANOPTIC_DISPATCH_CALLDATA_PARTS = "panoptic.dispatchCalldataParts";
  export const PANOPTIC_DISPATCH_EXPLICIT_CALLDATA_PARTS = "panoptic.dispatchExplicitCalldataParts";
  export const PANOPTIC_DISPATCH_EXPLICIT_FRAGMENT = "panoptic.dispatchExplicitFragment";
  export const PANOPTIC_DISPATCH_FRAGMENT = "panoptic.dispatchFragment";

  export const PERMIT2_APPROVE_FRAGMENT = "permit2.approveFragment";

  export const POOL_FETCH_POOL_ID = "pool.fetchPoolId";
  export const POOL_GET_ORACLE_STATE = "pool.getOracleState";
  export const POOL_GET_POOL = "pool.getPool";
  export const POOL_GET_POOL_METADATA = "pool.getPoolMetadata";
  export const POOL_GET_PRICES_AT_TICK = "pool.getPricesAtTick";
  export const POOL_GET_RISK_PARAMETERS = "pool.getRiskParameters";
  export const POOL_GET_TICK_SPACING = "pool.getTickSpacing";
  export const POOL_GET_UTILIZATION = "pool.getUtilization";

  export const UNISWAP_BUILD_V3_EXACT_IN_EXECUTE_CALLDATA_PARTS = "uniswap.buildV3ExactInExecuteCalldataParts";
  export const UNISWAP_BUILD_V3_EXACT_IN_EXECUTE_FRAGMENT = "uniswap.buildV3ExactInExecuteFragment";
  export const UNISWAP_CHECK_ROUTER_APPROVAL = "uniswap.checkRouterApproval";
  export const UNISWAP_QUOTE_SWAP_EXACT_IN_VIA_ROUTER = "uniswap.quoteSwapExactInViaRouter";
  export const UNISWAP_QUOTE_SWAP_EXACT_OUT_VIA_ROUTER = "uniswap.quoteSwapExactOutViaRouter";
  export const UNISWAP_RESOLVE_SWAP_ROUTE = "uniswap.resolveSwapRoute";

  export const WETH_DEPOSIT_CALLDATA_PARTS = "weth.depositCalldataParts";
  export const WETH_WITHDRAW_CALLDATA_PARTS = "weth.withdrawCalldataParts";
}
