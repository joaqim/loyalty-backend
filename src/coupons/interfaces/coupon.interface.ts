export interface Coupon {
    id: number;
    code: string;
    amount: string;
    status: string;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    discount_type: string;
    description: string;
    date_expires: null;
    date_expires_gmt: null;
    usage_count: number;
    individual_use: boolean;
    product_ids: unknown[];
    excluded_product_ids: unknown[];
    usage_limit: number;
    usage_limit_per_user: null;
    limit_usage_to_x_items: null;
    free_shipping: boolean;
    product_categories: unknown[];
    excluded_product_categories: unknown[];
    exclude_sale_items: boolean;
    minimum_amount: string;
    maximum_amount: string;
    email_restrictions: string[];
    used_by: unknown[];
    meta_data: CouponMetaDatum[];
    _links: CouponLinks;
}

export interface CouponLinks {
    self: Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface CouponMetaDatum {
    id: number;
    key: string;
    value: PurpleValue[] | FluffyValue | string;
}

export interface PurpleValue {
    coupon_code: string;
    coupon_message: string;
}

export interface FluffyValue {
    '0': string;
    time: number;
    fonts: unknown[];
    icons: unknown[];
    dynamic_elements_ids: unknown[];
    status: string;
    css: string;
}
