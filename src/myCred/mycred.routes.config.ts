import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import mycredsController from './controllers/mycreds.controller';
import mycredMiddleware from './middleware/mycred.middleware';

export class MyCredRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'MyCredRoutes');
    }
    configureRoutes(): Application {
        this.app
            .route('/mycred/badges')
            .all(mycredMiddleware.validateParams)
            .post(mycredsController.getBadges);
        this.app
            .route('/mycred/points')
            .all(mycredMiddleware.validateParams)
            .post(mycredsController.getPoints);
        this.app
            .route('/mycred/ranks')
            .all(mycredMiddleware.validateParams)
            .post(mycredsController.getRanks);

        return this.app;
    }
}
