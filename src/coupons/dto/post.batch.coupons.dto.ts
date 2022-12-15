import { CouponBrief } from '../interfaces/coupon.brief.interface';
import { PostBatchCouponDto } from './post.batch.coupon.dto';

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
