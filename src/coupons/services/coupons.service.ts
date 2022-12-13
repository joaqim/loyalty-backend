import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import {
    WOO_GB_IDENTITY,
    WOO_GB_SECRET,
    WOO_GB_STOREFRONT,
} from '../../utils/woo.keys';

import { PostBatchCouponsDto } from '../dto/post.batch.coupon.dto';
import { Coupon } from '../interfaces/coupon.interface';

interface WooPaginationHeaders {
    'x-wp-total': string;
    'x-wp-totalpages': string;
}
class CouponsService {
    async list(
        limit: number,
        page: number
    ): Promise<{ data: Coupon[]; headers: WooPaginationHeaders }> {
        const api = new WooCommerceRestApi({
            url: WOO_GB_STOREFRONT,
            consumerKey: WOO_GB_IDENTITY,
            consumerSecret: WOO_GB_SECRET,
            version: 'wc/v2',
        });
        return await api.get('coupons', {
            page,
            per_page: limit,
            status: 'publish',
        });
    }

    async batch(resource: PostBatchCouponsDto): Promise<Coupon[]> {
        return [];
    }

    /* async updateById(id: string, resource: Partial<Coupon>) {
        return {};
    }

    async readById(id: string) {
    }
    async deleteById(id: string) {
    }
    async patchById(id: string, resource: Partial<Coupon>) {
    } */
}

export default new CouponsService();
