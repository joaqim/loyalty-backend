import 'dotenv/config';

import {
    WOO_GB_STOREFRONT,
    WOO_GB_IDENTITY,
    WOO_GB_SECRET,
    WOO_GB_MYCRED_ACCESS_KEY,
    WOO_GB_MYCRED_API_ENDPOINT,
} from './utils/woo.keys';

if (typeof WOO_GB_STOREFRONT !== 'string') {
    throw new Error('Missing WOO_GB_STOREFRONT in .env');
}
if (typeof WOO_GB_IDENTITY !== 'string') {
    throw new Error('Missing WOO_GB_IDENTITY in .env');
}
if (typeof WOO_GB_SECRET !== 'string') {
    throw new Error('Missing WOO_GB_SECRET in .env');
}
if (typeof WOO_GB_MYCRED_ACCESS_KEY !== 'string') {
    throw new Error('Missing WOO_GB_MYCRED_ACCESS_KEY in .env');
}
if (typeof WOO_GB_MYCRED_API_ENDPOINT !== 'string') {
    throw new Error('Missing WOO_GB_MYCRED_API_ENDPOINT in .env');
}

import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import { CommonRoutesConfig } from './common/common.routes.config';
import { LoyaltyRoutes } from './loyalty/loyalty.routes.config';
import fs from 'fs';
import path from 'path';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT ?? 8080;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('server');

app.use(bodyparser.json());
// app.use(cors());
// app.use(cors({origin: "http://env-6713015.sekd1.beebyteapp.io", credentials: true}));
app.use(cors({ origin: true, credentials: true }));

app.use(helmet());

const logDir = './logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `${logDir}/winston-log.txt`,
            level: 'info',
        }),
    ],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, make terse
    // if (typeof global.it === 'function') {
    // NOTE: Note sure what this determines exactly
    if (
        typeof (global as typeof globalThis & { it: () => unknown }).it ===
        'function'
    ) {
        loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
    }
}

app.use(expressWinston.logger(loggerOptions));

// routes.push(new CouponsRoutes(app));
routes.push(new LoyaltyRoutes(app));
// routes.push(new MyCredRoutes(app));

const publicPath = path.join(__dirname, '../public');
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
app.use(express.static(publicPath));

/*
app.get('/', (req: express.Request, res: express.Response) => {
    fs.readFile('./public/index.html', 'utf8', function (err, html) {
        console.log({ html });
        if (!err) res.send(html);
        return;
    });
    res.status(200).send(`Server running at http://localhost:${port}`);
});
*/

export default server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
