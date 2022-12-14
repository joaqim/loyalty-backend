import { Coupon } from '../interfaces/coupon.interface';

export interface PostBatchCouponsResultDto {
    update: Coupon[];
    create?: Coupon[];
    delete?: Coupon[];
}
