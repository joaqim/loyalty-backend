import { Request, Response } from 'express';
import winston from 'winston';
import loyaltyService from '../services/loyalty.service';

winston.configure({
    transports: [
        new winston.transports.File({
            filename: './public/loyalty-info.log',
            level: 'info',
        }),
    ],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint()
    ),
});

class LoyaltyController {
    public async updateLoyalty(req: Request, res: Response) {
        const { user_id, email } = req.body;
        const updatedCoupons = await loyaltyService.updateCoupons(
            user_id,
            email
        );

        winston.log('info', `${JSON.stringify(updatedCoupons)}`);

        res.status(201).send(updatedCoupons);
    }
}

export default new LoyaltyController();
