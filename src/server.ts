import 'dotenv/config';

import {
    WOO_GB_STOREFRONT,
    WOO_GB_IDENTITY,
    WOO_GB_SECRET,
    WOO_GB_MYCRED_ACCESS_KEY,
    WOO_GB_MYCRED_API_ENDPOINT,
} from './common/constants/woo.keys';

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
import http from 'http';
import https from 'https';
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

let key: string | undefined;
let cert: string | undefined;
try {
    key = fs.readFileSync('/var/lib/jelastic/keys/privkey.pem', 'utf-8');
    cert = fs.readFileSync('/var/lib/jelastic/keys/fullchain.pem', 'utf-8');
} catch {
    // Assume we are outside of jelastic environment
    // and therefore won't need SSI certificate for https
}

const port = process.env.PORT ?? 8080;

const app: express.Application = express();
let server: http.Server | https.Server;

if (key && cert) {
    server = https.createServer({ key, cert }, app);
} else {
    server = http.createServer(app);
}

const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('server');

app.use(bodyparser.json());
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
            filename: `${logDir}/winston-error.log`,
            level: 'error',
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

app.use(express.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(8000);

export default server.listen(port, () => {
    debugLog(`Server running at https://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
