import { Request, Response, NextFunction } from 'express';

class MyCredMiddleware {
    async validateParams(req: Request, res: Response, next: NextFunction) {
        const { user_id } = req.body;
        if (typeof user_id !== 'string') {
            res.status(400).send({
                errors: [`Missing body param 'user_id'`],
            });
        }
        next();
    }
}

export default new MyCredMiddleware();
