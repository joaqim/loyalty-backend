import { Coupon } from './coupon.interface';
const keys = ['id', 'code', 'email_restrictions', 'used_by'];
export class CouponBrief {
    id!: string;
    code!: string;
    email_restrictions!: string[];
    used_by!: string[];

    constructor(coupon: Coupon) {
        Object.assign(
            this,
            Object.fromEntries(
                Object.entries(coupon).filter(([k]) => keys.includes(k))
            )
        );
    }
}
