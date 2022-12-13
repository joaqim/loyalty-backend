import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

export class RanksRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'RanksRoutes');
    }
    configureRoutes(): Application {
        this.app.route('/ranks').get();

        return this.app;
    }
}
