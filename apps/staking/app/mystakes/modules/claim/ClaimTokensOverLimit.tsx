import { WizardSectionDescription } from '@/components/Wizard';
import { useNetworkBalances } from '@/hooks/useNetworkBalances';
import { URL } from '@/lib/constants';
import useRelativeTime from '@/hooks/useRelativeTime';
import { formatEnglishTimeDistance } from '@/lib/locale-client';
import { bigIntToNumber } from '@session/util-crypto/maths';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { Address } from 'viem';

export function ClaimTokensOverLimit({ address }: { address: Address }) {
  const dict = useTranslations('infoNotice');
  const { networkClaimPeriodEnd, claimCycle } = useNetworkBalances({ addressOverride: address });
  const periodEndDate = useMemo(
    () => (networkClaimPeriodEnd ? new Date(networkClaimPeriodEnd) : null),
    [networkClaimPeriodEnd]
  );

  const relativeTime = useRelativeTime(periodEndDate, { addSuffix: true });

  return (
    <div className="mb-4 text-center">
      <WizardSectionDescription
        description={dict('claimLimitInfo', {
          linkOut: '',
          claimCycleTime: formatEnglishTimeDistance(bigIntToNumber(claimCycle, 0), ' ', false),
        })}
        href={URL.LEARN_MORE_UNCLAIMED_REWARDS}
      />
      <br />
      {dict.rich('claimLimitCountdown', {
        relativeTime,
      })}
    </div>
  );
}
