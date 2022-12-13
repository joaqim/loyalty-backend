export interface MyCredRanks {
    id: number;
    title: Readonly<string>;
    max: Readonly<string>;
    min: Readonly<string>;
    logo_url: Readonly<false | string>;
    point_type: Readonly<'XP' | string>;
}
