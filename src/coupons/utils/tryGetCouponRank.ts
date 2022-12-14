import { CouponBrief } from '../interfaces/coupon.brief.interface';

export const tryGetCouponRank = (coupon: CouponBrief) => {
    const matches = /^Rank (\d+).*/.exec(coupon.description);
    if (matches?.length !== 2) {
        throw new Error(
            `Failed to find Rank in Coupon description: '${coupon.description}'`
        );
    }
    return parseInt(matches[1]);
};
