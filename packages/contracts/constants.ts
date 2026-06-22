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
    [arbitrumChainId]: '0x10Ea9E5303670331Bdddfa66A4cEA47dae4fcF3b',
    [ethChainId]: '0x10Ea9E5303670331Bdddfa66A4cEA47dae4fcF3b',
    [arbitrumSepoliaChainId]: '0x992E6EA54d74e79cd2CEC8D9fBD101a9a105ace5',
  },
  ServiceNodeRewards: {
    [arbitrumChainId]: '0xC2B9fC251aC068763EbDfdecc792E3352E351c00',
    /** @deprecated - The contract is not deployed on eth mainnet */
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0x08A5a47E67fCd18e14AdFB535e8d8644476D4197',
  },
  RewardRatePool: {
    [arbitrumChainId]: '0x11f040E89dFAbBA9070FFE6145E914AC68DbFea0',
    /** @deprecated - The contract is not deployed on eth mainnet */
    [ethChainId]: '0x0000000000000000000000000000000000000000',
    [arbitrumSepoliaChainId]: '0xe055c7200aE13984fe66c2e8AaC608bC80E19D57',
  },
  ServiceNodeContributionFactory: {
    [arbitrumChainId]: '0x8129bE2D5eF7ACd39483C19F28DE86b7EF19DBCA',
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
