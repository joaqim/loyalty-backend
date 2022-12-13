import { Request, Response } from 'express';
import { CouponBrief } from '../interfaces/coupon.brief.interface';
import couponsService from '../services/coupons.service';

class CouponsController {
    public async getCoupons(req: Request, res: Response) {
        const { data, headers } = await couponsService.list(100, 1);
        const couponsBrief = data.map((coupon) => new CouponBrief(coupon));
        console.log({ headers });

        res.status(200).send({
            data: data,
            total: headers['x-wp-total'],
        });
    }
}

export default new CouponsController();
