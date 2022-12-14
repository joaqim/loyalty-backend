import axios from 'axios';
import {
    WOO_GB_MYCRED_ACCESS_KEY,
    WOO_GB_MYCRED_API_ENDPOINT,
    WOO_GB_STOREFRONT,
} from '../../utils/woo.keys';
import type { MyCredBadges, MyCredPoints, MyCredRank } from '../interfaces';

type MyCredResources = 'badges' | 'points' | 'ranks';

class MyCredService {
    async list<T extends MyCredBadges | MyCredPoints | MyCredRank>(
        resources: MyCredResources,
        userId: string
    ): Promise<{ data?: T; errors?: string[] }> {
        const url = `${WOO_GB_STOREFRONT}/wp-json/${WOO_GB_MYCRED_API_ENDPOINT}/${resources}`;
        try {
            const { data, status, statusText } = await axios({
                url,
                method: 'POST',
                data: {
                    access_key: WOO_GB_MYCRED_ACCESS_KEY,
                    user_id: userId,
                    type: 'get',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'gzip,deflate,compress',
                },
            });

            if (status !== 200 || !data || typeof data.Error === 'string') {
                throw new Error(
                    `Request returned status: ${status}:${statusText} - '${
                        data.Error as string
                    }'`
                );
            }

            return { data };
        } catch (error) {
            const message = (error as Error).message;
            return {
                errors: [
                    `Failed to fetch resource: '${resources}' from URL: '${url}'`,
                    message,
                ],
            };
        }
    }
}

export default new MyCredService();
