import debug from 'debug';
import { Request, Response } from 'express';
import mycredsService from '../services/mycred.service';

const log: debug.IDebugger = debug('server:mycred-controller');

class MyCredController {
    public async getBadges(req: Request, res: Response) {
        const { user_id } = req.body;
        const badges = await mycredsService.list('badges', user_id);
        res.status(200).send({ data: badges });
    }
    public async getPoints(req: Request, res: Response) {
        const { user_id } = req.body;
        const points = await mycredsService.list('points', user_id);
        res.status(200).send({ data: points });
    }

    public async getRanks(req: Request, res: Response) {
        const { user_id } = req.body;
        const ranks = await mycredsService.list('ranks', user_id);
        res.status(200).send({ data: ranks });
    }
}

export default new MyCredController();
