import type { BlsRewardsInfo } from '@session/staking-api-js/schema';

export type ParsedNetworkBalances = {
  unclaimed: bigint;
  lifetimeRewards: bigint;
  lifetimeStaked: bigint;
  timeLockedStakes: bigint;
  lockedStakes: bigint;
  claimableRewards: bigint;
  claimableStakes: bigint;
};

const clampNonNegative = (value: bigint) => (value < 0n ? 0n : value);

export function parseNetworkBalances(rewards?: BlsRewardsInfo | null): ParsedNetworkBalances {
  let lifetimeLiquidated = 0n;
  let lifetimeStaked = 0n;
  let lifetimeRewards = 0n;
  let lifetimeUnlockedStakes = 0n;
  let lockedStakes = 0n;
  let timeLockedStakes = 0n;

  let claimableStakes = 0n;
  let claimableRewards = 0n;

  if (rewards) {
    lifetimeLiquidated = rewards.lifetime_liquidated_stakes;
    lifetimeStaked = rewards.lifetime_locked_stakes;
    lifetimeRewards = rewards.lifetime_rewards;
    lifetimeUnlockedStakes = rewards.lifetime_unlocked_stakes;
    lockedStakes = rewards.locked_stakes;
    timeLockedStakes = rewards.timelocked_stakes;

    claimableStakes = clampNonNegative(
      lifetimeUnlockedStakes - lifetimeLiquidated - rewards.claimed_stakes
    );
    claimableRewards = clampNonNegative(lifetimeRewards - rewards.claimed_rewards);
  }

  const unclaimed = claimableRewards + claimableStakes;

  return {
    unclaimed,
    lifetimeRewards,
    lifetimeStaked,
    timeLockedStakes,
    lockedStakes,
    claimableRewards,
    claimableStakes,
  };
}
