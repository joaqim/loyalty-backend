import { CouponBrief } from '../interfaces/coupon.brief.interface';

export class PostBatchCouponDto {
    id: string;
    email_restrictions: string[];

    constructor(
        coupon: CouponBrief,
        additionalEmail: string,
        removeEmail = false
    ) {
        this.id = coupon.id;
        if (removeEmail) {
            this.email_restrictions = coupon.email_restrictions.filter(
                (email) => email != additionalEmail
            );
        } else {
            this.email_restrictions = [
                ...coupon.email_restrictions,
                additionalEmail,
            ];
        }
    }
}

export class PostBatchCouponsDto {
    update: PostBatchCouponDto[] = [];

    constructor(
        eligibleCoupons: CouponBrief[],
        remainingCoupons: CouponBrief[],
        email: string
    ) {
        eligibleCoupons.forEach((coupon) => {
            if (!coupon.email_restrictions.includes(email))
                this.update.push(new PostBatchCouponDto(coupon, email));
        });
        remainingCoupons.forEach((coupon) => {
            if (coupon.email_restrictions.includes(email))
                this.update.push(new PostBatchCouponDto(coupon, email, true));
        });
    }
}
