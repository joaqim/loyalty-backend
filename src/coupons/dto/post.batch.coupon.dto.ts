import { CouponBrief } from '../interfaces/coupon.brief.interface';

export class PostBatchCouponDto {
    id: string;
    email_restrictions: string[];

    constructor(coupon: CouponBrief, additionalEmail: string) {
        this.id = coupon.id;
        this.email_restrictions = [
            ...coupon.email_restrictions,
            additionalEmail,
        ];
    }
}

export class PostBatchCouponsDto {
    update: PostBatchCouponDto[] = [];

    constructor(coupons: CouponBrief[], email: string) {
        coupons.forEach((coupon) => {
            if (!coupon.email_restrictions.includes(email))
                this.update.push(new PostBatchCouponDto(coupon, email));
        });
    }
}
