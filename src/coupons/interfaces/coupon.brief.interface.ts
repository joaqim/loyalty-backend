import { Coupon } from './coupon.interface';
const keys = ['id', 'description', 'code', 'email_restrictions'];

export class CouponBrief {
    id!: string;
    description!: string;
    code!: string;

    // tslint:disable-next-line variable-name
    email_restrictions!: string[];

    // tslint:disable-next-line variable-name
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
