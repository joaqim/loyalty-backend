import { CreateRankDto } from '../dto/create.rank.dto';
import { Rank } from '../interfaces/rank.interface';

class RanksService {
    async list(limit: number, page: number): Promise<Rank[]> {
        return [];
    }

    async create(resource: CreateRankDto): Promise<Rank> {
        return { ...resource, id: '0' };
    }

    /* async updateById(id: string, resource: Partial<Rank>) {
        return {};
    }

    async readById(id: string) {
    }
    async deleteById(id: string) {
    }
    async patchById(id: string, resource: Partial<Rank>) {
    } */
}

export default new RanksService();
