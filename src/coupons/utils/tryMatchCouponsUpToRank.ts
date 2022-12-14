import type { MyCredRank } from '../../myCred/interfaces';
import type { CouponBrief } from '../interfaces/coupon.brief.interface';

export const tryMatchCouponsUpToRank = (
    coupons: CouponBrief[],
    rank: MyCredRank
): CouponBrief[] => {
    const highestRankIndex = coupons.findIndex(({ description }) =>
        description.includes(rank.title)
    );

    if (highestRankIndex === -1) {
        throw new Error(`Found no Coupon matching rank title: ${rank.title}`);
    }
    return coupons.slice(0, highestRankIndex + 1);
};
