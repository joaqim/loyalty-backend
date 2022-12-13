import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import loyaltyController from './controllers/loyalty.controller';
import loyaltyMiddleware from './middleware/loyalty.middleware';

export class LoyaltyRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'LoyaltyRoutes');
    }

    configureRoutes(): Application {
        this.app
            .route('/loyalty')
            .all(loyaltyMiddleware.validatePostBody)
            .post(loyaltyController.updateLoyalty);

        return this.app;
    }
}
