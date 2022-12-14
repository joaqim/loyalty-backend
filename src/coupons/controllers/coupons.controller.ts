import { Request, Response } from 'express';
import { CouponBrief } from '../interfaces/coupon.brief.interface';
import couponsService from '../services/coupons.service';

class CouponsController {
    public async getCoupons(req: Request, res: Response) {
        const { data, headers } = await couponsService.listCoupons(100, 1);

        res.status(200).send({
            data,
            total: headers['x-wp-total'],
            total_pages: headers['x-wp-totalpages'],
        });
    }

    public async getCouponsBrief(req: Request, res: Response) {
        const { data, headers } = await couponsService.listCouponsBrief(100, 1);

        res.status(200).send({
            data,
            total: headers['x-wp-total'],
            total_pages: headers['x-wp-totalpages'],
        });
    }
}

export default new CouponsController();
