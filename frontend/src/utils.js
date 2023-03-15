import { ethers } from "ethers";
import { POLYGON_MUMBAI_CHAIN_ID } from "./constants";

export function toWei(val) {
  return ethers.utils.parseEther(val);
}

export function fromWei(val) {
  return ethers.utils.formatEther(val);
}

export function isPolygonMumbai(network) {
  return network === POLYGON_MUMBAI_CHAIN_ID;
}
