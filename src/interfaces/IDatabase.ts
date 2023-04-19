export interface IDatabase {
    find(
        table: string,
        filter: Record<string, unknown>,
        limit?: number,
        offset?: number
    ): Promise<any[]>
    findOne(table: string, filter: Record<string, unknown>): Promise<any | null>
    create(table: string, data: Record<string, unknown>): Promise<any>
    update(
        table: string,
        filter: Record<string, unknown>,
        data: Record<string, unknown>
    ): Promise<any>
    delete(table: string, filter: Record<string, unknown>): Promise<any>
}
