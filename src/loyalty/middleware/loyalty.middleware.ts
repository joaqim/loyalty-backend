import { NextFunction, Request, Response } from 'express';
import { isValidEmail } from '../../common/utils/isValidEmail';
import loyaltyService from '../services/loyalty.service';

class LoyaltyMiddleware {
    async validatePostBody(req: Request, res: Response, next: NextFunction) {
        const { email, user_id } = req.body;
        try {
            if (typeof email === 'string') {
                throw new Error(
                    `Loyalty Endpoint does not support 'email' in post.`
                );
            }
            if (typeof user_id !== 'string' || !/^\d+$/.test(user_id)) {
                throw new Error(`Missing or invalid user_id: '${user_id}'`);
            }
        } catch (error) {
            const message = (error as Error).message;
            res.status(401).send({
                errors: [`Failed to verify body`, message],
            });
        }
        next();
    }

    async fetchUserEmail(req: Request, res: Response, next: NextFunction) {
        const { user_id } = req.body;
        const { data, errors } = await loyaltyService.getUserEmail(user_id);
        if (errors) {
            res.status(401).send({ errors });
        } else {
            req.body.email = data;
        }

        next();
    }
}

export default new LoyaltyMiddleware();
