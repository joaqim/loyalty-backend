import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import {
    WOO_GB_IDENTITY,
    WOO_GB_SECRET,
    WOO_GB_STOREFRONT,
} from '../../utils/woo.keys';

import { PostBatchCouponsDto } from '../dto/post.batch.coupon.dto';
import { PostBatchCouponsResultDto } from '../dto/post.batch.coupons.result.dto';
import { CouponBrief } from '../interfaces/coupon.brief.interface';
import { Coupon } from '../interfaces/coupon.interface';
import { tryGetCouponRank } from '../utils/tryGetCouponRank';

interface WooPaginationHeaders {
    'x-wp-total': string;
    'x-wp-totalpages': string;
}
class CouponsService {
    async listCoupons(
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

    async listCouponsBrief(
        limit: number,
        page: number
    ): Promise<{
        data: CouponBrief[];
        headers: WooPaginationHeaders;
        errors?: string[];
    }> {
        const { data: coupons, headers } = await this.listCoupons(limit, page);
        const data = coupons
            .map((coupon) => new CouponBrief(coupon))
            .filter(({ description }) => /^Rank \d+/.test(description))
            .sort(
                (couponA, couponB) =>
                    tryGetCouponRank(couponA) - tryGetCouponRank(couponB)
            );

        const verifyCouponDescriptions = (
            coups: CouponBrief[]
        ): CouponBrief[] => {
            return coups.filter(
                ({ description }) =>
                    !/^Rank \d+\s+[\w- ]+ [IV]+/.test(description)
            );
        };

        let errors: string[] | undefined;
        const invalidDescriptions = verifyCouponDescriptions(data);
        if (invalidDescriptions.length > 0) {
            errors = [
                `Unexpected Coupon description(s): `,
                invalidDescriptions
                    .map(({ description }) => description)
                    .join(', '),
            ];
        }

        return {
            data,
            headers,
            errors,
        };
    }

    async batchCoupons(
        resource: PostBatchCouponsDto
    ): Promise<PostBatchCouponsResultDto> {
        const api = new WooCommerceRestApi({
            url: WOO_GB_STOREFRONT,
            consumerKey: WOO_GB_IDENTITY,
            consumerSecret: WOO_GB_SECRET,
            version: 'wc/v2',
        });
        return (await api.post('coupons/batch', resource)).data;
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
