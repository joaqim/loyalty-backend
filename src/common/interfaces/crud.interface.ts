export interface CRUD {
    list: (limit: number, page: number) => Promise<unknown>;
    create: (resource: unknown) => Promise<unknown>;
    updateById: (id: string, resource: unknown) => Promise<string>;
    readById: (id: string) => Promise<unknown>;
    deleteById: (id: string) => Promise<string>;
    patchById: (id: string, resource: unknown) => Promise<string>;
}
