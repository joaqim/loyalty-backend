import { NextFunction, Request, Response } from 'express';

const isValidEmail = (email: string) => {
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};

class LoyaltyMiddleware {
    async validatePostBody(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        try {
            if (typeof email !== 'string' || !isValidEmail(email)) {
                throw new Error(`Invalid E-Mail: ${email}`);
            }
        } catch (error) {
            const message = (error as Error).message;
            res.status(401).send({
                errors: [`Failed to verify body`, message],
            });
        }
        next();
    }
}

export default new LoyaltyMiddleware();
