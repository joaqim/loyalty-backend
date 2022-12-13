export interface PostBatchCouponsDto {
    update: [
        {
            id: number;
            email_restrictions: string[];
        }
    ];
}
