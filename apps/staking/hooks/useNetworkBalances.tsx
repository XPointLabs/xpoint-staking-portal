import { BACKEND, HANDRAIL_THRESHOLD, PREFERENCE } from '@/lib/constants';
import { FEATURE_FLAG } from '@/lib/feature-flags';
import { useFeatureFlag } from '@/lib/feature-flags-client';
import logger from '@/lib/logger';
import { getRewardsInfo } from '@/lib/queries/getRewardsInfo';
import { useStakingBackendQueryWithParams } from '@/lib/staking-api-client';
import { useClaimCycleDetails } from '@session/contracts/hooks/ServiceNodeRewards';
import { rewardsInfoSchema } from '@session/staking-api-js/schema';
import { bigIntToNumber } from '@session/util-crypto/maths';
import { useWallet } from '@session/wallet/hooks/useWallet';
import { useMemo } from 'react';
import { usePreferences } from 'usepref';
import type { Address } from 'viem';
import { parseNetworkBalances } from './networkBalances';

export const useNetworkBalances = (params?: { addressOverride?: Address }) => {
  const { address: connectedAddress } = useWallet();
  const forceClaimOverThreshold = useFeatureFlag(FEATURE_FLAG.FORCE_CLAIM_OVER_THRESHOLD);
  const { getItem } = usePreferences();
  const address = params?.addressOverride ?? connectedAddress;

  const autoRefresh = !getItem<boolean>(PREFERENCE.DISABLE_BACKEND_AUTO_REFRESH);

  const enabled = !!address;

  const {
    data,
    status,
    refetch: refetchRewardsInfo,
  } = useStakingBackendQueryWithParams(
    getRewardsInfo,
    {
      address: address!,
    },
    {
      enabled,
      refetchInterval: autoRefresh ? BACKEND.NODE_TARGET_UPDATE_INTERVAL_SECONDS * 1000 : undefined,
    }
  );

  const {
    claimThreshold,
    claimCycle,
    currentClaimTotal,
    status: claimCycleStatus,
    refetch: refetchClaimCycleDetails,
  } = useClaimCycleDetails({ enabled });

  const refetch = async () => {
    return await Promise.allSettled([refetchRewardsInfo(), refetchClaimCycleDetails()]);
  };

  const parsedData = useMemo(() => {
    if (data) {
      const rewards = rewardsInfoSchema.parse(data.rewards);
      return parseNetworkBalances(rewards);
    }

    return parseNetworkBalances();
  }, [data]);

  const canClaim =
    status === 'success' && parsedData.unclaimed >= BigInt(HANDRAIL_THRESHOLD.CLAIM_REWARDS_AMOUNT);

  const claimPeriodData = useMemo(() => {
    let isClaimOverLimit = false;
    let networkClaimPeriodEnd: number | null = null;

    if (claimCycleStatus === 'success' && canClaim) {
      const networkCycleTotalAfterClaim = currentClaimTotal + parsedData.unclaimed;
      if (networkCycleTotalAfterClaim > claimThreshold || forceClaimOverThreshold) {
        if (claimCycle === 0n) {
          logger.warn('Claim cycle is 0, either the claim limit is off or something went wrong!');
          return;
        }

        isClaimOverLimit = true;
        const now = Math.trunc(Date.now() / 1000);
        const cc = bigIntToNumber(claimCycle, 0);

        networkClaimPeriodEnd = (Math.trunc(now / cc) + 1) * cc * 1000;
      }
    }

    return {
      isClaimOverLimit,
      networkClaimPeriodEnd,
    };
  }, [
    canClaim,
    claimThreshold,
    claimCycle,
    currentClaimTotal,
    claimCycleStatus,
    parsedData,
    forceClaimOverThreshold,
  ]);

  return {
    ...parsedData,
    ...claimPeriodData,
    claimCycle,
    canClaim,
    refetch,
    status,
    enabled,
  };
};
