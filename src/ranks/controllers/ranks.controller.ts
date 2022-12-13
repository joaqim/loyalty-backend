import debug from 'debug';
import { Request, Response } from 'express';
import ranksService from '../services/ranks.service';

const log: debug.IDebugger = debug('server:ranks-controller');

class RanksController {
    public async getRanks(req: Request, res: Response) {
        const ranks = await ranksService.list(25, 1);
        res.status(200).send(ranks);
    }
}

export default new RanksController();
