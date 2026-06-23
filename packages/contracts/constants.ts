import type { Address } from 'viem';
import { arbitrum, arbitrumSepolia, mainnet } from 'viem/chains';
import type { ContractWithAbiName } from './abis';

const contracts = [
  'RewardRatePool',
  'Token',
  'ServiceNodeRewards',
  'ServiceNodeContributionFactory',
  'ServiceNodeContribution',
  'TokenVestingStaking',
] as const satisfies Array<ContractWithAbiName>;
export type ContractName = (typeof contracts)[number];

const ethChainId = mainnet.id;
const arbitrumChainId = arbitrum.id;
const arbitrumSepoliaChainId = arbitrumSepolia.id;

export type ChainId = typeof ethChainId | typeof arbitrumChainId | typeof arbitrumSepoliaChainId;

export const isValidChainId = (chainId?: number | undefined): chainId is ChainId =>
  chainId === arbitrumChainId || chainId === arbitrumSepoliaChainId || chainId === ethChainId;

export const addresses: Record<ContractName, Record<ChainId, Address>> = {
  Token: {
    [arbitrumChainId]: '0x63B2cdb8B0d8774F1Fdca91D24803698582a079F',
    /** @deprecated - XPNT staking uses Arbitrum deployments. */
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0x992E6EA54d74e79cd2CEC8D9fBD101a9a105ace5',
  },
  ServiceNodeRewards: {
    [arbitrumChainId]: '0xc52284b7aBAebbEF7BdE0E1ca8251B44AeA12F5f',
    /** @deprecated - The contract is not deployed on eth mainnet */
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0x08A5a47E67fCd18e14AdFB535e8d8644476D4197',
  },
  RewardRatePool: {
    [arbitrumChainId]: '0xEd894fb5f0BA3b141A562190D4c9941FEd348356',
    /** @deprecated - The contract is not deployed on eth mainnet */
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0xe055c7200aE13984fe66c2e8AaC608bC80E19D57',
  },
  ServiceNodeContributionFactory: {
    [arbitrumChainId]: '0x289d88A8C06881634Fb619Ec528361C7b88521f1',
    /** @deprecated - The contract is not deployed on eth mainnet */
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0x34e50278dbeDdB0F8EC7641D2304CFf4F116066b',
  },
  ServiceNodeContribution: {
    [arbitrumChainId]: '0x0000000000000000000000000000000000000000',
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0x0000000000000000000000000000000000000000',
  },
  TokenVestingStaking: {
    [arbitrumChainId]: '0x0000000000000000000000000000000000000000',
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0x0000000000000000000000000000000000000000',
  },
} as const;

export enum TOKEN {
  DECIMALS = 9,
  SYMBOL = 'XPNT',
}

export const SENT_DECIMALS = 9;
export const SENT_SYMBOL = 'XPNT';
