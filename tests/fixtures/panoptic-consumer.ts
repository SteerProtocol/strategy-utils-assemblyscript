import {
  DynamicJobFragmentDto,
  Erc20ApproveFragmentRequestDto,
  PanopticMethods,
  erc20ApproveFragment,
} from "../../assembly";

export function buildTypedPanopticRequest(): string {
  const request = new Erc20ApproveFragmentRequestDto();
  request.args.token = "0x00000000000000000000000000000000000000a0";
  request.args.spender = "0x00000000000000000000000000000000000000b0";
  request.args.amount = "100";

  return PanopticMethods.ERC20_APPROVE_FRAGMENT
    + ":" + request.args.token
    + ":" + request.args.spender
    + ":" + request.args.amount;
}

export function compileTypedPanopticWrapper(): string {
  const response = erc20ApproveFragment(new Erc20ApproveFragmentRequestDto());
  const fragment: DynamicJobFragmentDto = response.result;
  return fragment.value;
}
