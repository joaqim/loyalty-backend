import type { MyCredRank } from '../../myCred/interfaces';
import type { CouponBrief } from '../interfaces/coupon.brief.interface';

export const tryMatchCouponsUpToRank = (
    coupons: CouponBrief[],
    rank: MyCredRank
): { eligibleCoupons: CouponBrief[]; remainingCoupons: CouponBrief[] } => {
    const highestRankIndex = coupons.findIndex(({ description }) =>
        description.includes(rank.title)
    );

    if (highestRankIndex === -1) {
        throw new Error(`Found no Coupon matching rank title: ${rank.title}`);
    }
    const eligibleCoupons = coupons.slice(0, highestRankIndex + 1);
    let remainingCoupons: CouponBrief[] = [];

    // NOTE: remainingCoupons will never contain the lowest Rank
    if (highestRankIndex < coupons.length) {
        remainingCoupons = coupons.slice(highestRankIndex + 1, coupons.length);
    }
    return { eligibleCoupons, remainingCoupons };
};
