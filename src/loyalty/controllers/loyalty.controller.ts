import debug from 'debug';
import { Request, Response } from 'express';
import loyaltyService from '../services/loyalty.service';

const log: debug.IDebugger = debug('server:ranks-controller');

class LoyaltyController {
    public async updateLoyalty(req: Request, res: Response) {
        const { user_id, email } = req.body;
        const updatedCoupons = await loyaltyService.updateCoupons(
            user_id,
            email
        );
        res.status(201).send(updatedCoupons);
    }
}

export default new LoyaltyController();
