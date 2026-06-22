import { parseNetworkBalances } from '../hooks/networkBalances';

describe('parseNetworkBalances', () => {
  it('does not expose negative claimable rewards when claimed rewards exceed lifetime rewards', () => {
    const balances = parseNetworkBalances({
      amount: 0n,
      lifetime_liquidated_stakes: 0n,
      lifetime_locked_stakes: 720_000_000_000n,
      lifetime_rewards: 130_277_789_468_746n,
      lifetime_unlocked_stakes: 0n,
      locked_stakes: 720_000_000_000n,
      timelocked_stakes: 0n,
      claimed_stakes: 0n,
      claimed_rewards: 132_270_871_199_160n,
    });

    expect(balances.claimableRewards).toBe(0n);
    expect(balances.claimableStakes).toBe(0n);
    expect(balances.unclaimed).toBe(0n);
  });

  it('does not expose negative claimable stakes when already claimed stakes exceed unlocked stakes', () => {
    const balances = parseNetworkBalances({
      amount: 0n,
      lifetime_liquidated_stakes: 10n,
      lifetime_locked_stakes: 100n,
      lifetime_rewards: 50n,
      lifetime_unlocked_stakes: 20n,
      locked_stakes: 80n,
      timelocked_stakes: 0n,
      claimed_stakes: 30n,
      claimed_rewards: 10n,
    });

    expect(balances.claimableRewards).toBe(40n);
    expect(balances.claimableStakes).toBe(0n);
    expect(balances.unclaimed).toBe(40n);
  });
});
