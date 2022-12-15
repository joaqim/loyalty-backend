import { CouponBrief } from '../interfaces/coupon.brief.interface';

export class PostBatchCouponDto {
    id: string;
    // tslint:disable-next-line variable-name
    email_restrictions: string[];

    constructor(
        coupon: CouponBrief,
        additionalEmail: string,
        removeEmail = false
    ) {
        this.id = coupon.id;
        if (removeEmail) {
            this.email_restrictions = coupon.email_restrictions.filter(
                (email) => email !== additionalEmail
            );
        } else {
            this.email_restrictions = [
                ...coupon.email_restrictions,
                additionalEmail,
            ];
        }
    }
}
