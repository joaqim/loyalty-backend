import debug from 'debug';
import { Request, Response } from 'express';
import loyaltyService from '../services/loyalty.service';

const log: debug.IDebugger = debug('server:ranks-controller');

class LoyaltyController {
    public async updateLoyalty(req: Request, res: Response) {
        const { email } = req.body;
        const loyalty = await loyaltyService.updateLoyalty(email, '');
        res.status(201).send({ email });
    }
}

export default new LoyaltyController();
