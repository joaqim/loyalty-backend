import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import couponsController from './controllers/coupons.controller';

export class CouponsRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'CouponsRoutes');
    }
    configureRoutes(): Application {
        this.app.route('/coupons').get(couponsController.getCoupons);
        this.app.route('/coupons/brief').get(couponsController.getCouponsBrief);

        return this.app;
    }
}
