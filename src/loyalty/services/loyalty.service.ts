import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { PostBatchCouponsDto } from '../../coupons/dto/post.batch.coupon.dto';
import { CouponBrief } from '../../coupons/interfaces/coupon.brief.interface';
import couponsService from '../../coupons/services/coupons.service';
import { isValidEmail } from '../../common/utils/isValidEmail';
import { MyCredRank } from '../../myCred/interfaces';
import mycredService from '../../myCred/services/mycred.service';
import {
    WOO_GB_STOREFRONT,
    WOO_GB_IDENTITY,
    WOO_GB_SECRET,
} from '../../utils/woo.keys';
import { PostBatchCouponsResultDto } from '../../coupons/dto/post.batch.coupons.result.dto';
import { tryMatchCouponsUpToRank } from '../../coupons/utils/tryMatchCouponsUpToRank';

class LoyaltyService {
    async getUserEmail(
        userId: string
    ): Promise<{ data: string; errors?: string[] }> {
        const api = new WooCommerceRestApi({
            url: WOO_GB_STOREFRONT,
            consumerKey: WOO_GB_IDENTITY,
            consumerSecret: WOO_GB_SECRET,
            version: 'wc/v2',
        });
        const { data } = (await api.post(`customers/${userId}`, {})) as {
            data: { shipping: { email?: string }; billing: { email?: string } };
        };
        const email = data.billing.email ?? data.shipping.email;
        if (!email || !isValidEmail(email)) {
            return {
                data: '',
                errors: [
                    `Failed to retrieve EMail from ${WOO_GB_STOREFRONT}${
                        typeof email === 'string'
                            ? `. EMail Received from Woo: ${email}`
                            : ''
                    }`,
                ],
            };
        }
        return { data: email };
    }

    async updateCoupons(
        userId: string,
        email: string
    ): Promise<{ data?: PostBatchCouponsDto; errors?: string[] }> {
        const { data: rank, errors } = await mycredService.list<MyCredRank>(
            'ranks',
            userId
        );

        if (errors) {
            return { errors };
        }

        const { data: coupons } = await couponsService.listCouponsBrief(100, 1);

        const couponsUpToHighestRank = tryMatchCouponsUpToRank(
            coupons,
            rank as MyCredRank
        );

        const batchUpdateForCoupons = new PostBatchCouponsDto(
            couponsUpToHighestRank,
            email
        );
        return {data: batchUpdateForCoupons};

        //const wooBatchUpdateCallResult = await couponsService.batchCoupons(batchUpdateForCoupons);
        //return { data: wooBatchUpdateCallResult, errors };
    }

    /* async updateById(id: string, resource: Partial<Loyalty>) {
        return {};
    }

    async readById(id: string) {
    }
    async deleteById(id: string) {
    }
    async patchById(id: string, resource: Partial<Loyalty>) {
    } */
}

export default new LoyaltyService();
