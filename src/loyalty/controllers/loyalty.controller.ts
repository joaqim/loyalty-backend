import { Request, Response } from 'express';
import winston from 'winston';
import loyaltyService from '../services/loyalty.service';

const logger = winston.createLogger({
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
        const {data: updatedCoupons, previousRank, newRank, errors} = await loyaltyService.updateCoupons(
            user_id,
            email
        );

	if(updatedCoupons && updatedCoupons.update.length > 0) {
        	logger.info(`Updated user: '${user_id}' to new rank: '${newRank}', from previous rank: '${previousRank}'`);
	} else {
        	logger.info(`User: '${user_id}' remains at rank: '${newRank}'.`);
	}
        res.status(201).send({ data: updatedCoupons, previousRank, newRank, errors});
    }
}

export default new LoyaltyController();
