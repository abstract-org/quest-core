export interface IPersistence {
    getQuests(kind?: string, limit?: number): Promise<any[]>
    getQuest(
        kind?: string,
        content?: string,
        hashAddress?: string
    ): Promise<any>
    getPool(token0?: string, token1?: string): Promise<any>
    getPoolPositions(poolAddress: string): Promise<any[]>
    getPoolState(poolAddress: string): Promise<any>
    getWallet(hash: string): Promise<any>
    initQuest(kind: string, content: string, symbol?: string): Promise<any>
    initPool(
        token0: string,
        token1: string,
        startingPrice: number
    ): Promise<any>
    initWallet(address: string): Promise<any>
    initRouter(quests: any[], pools: any[]): Promise<any>
    citeQuest(
        crossPool: any,
        citedPool: any,
        citingPool: any,
        amount: number
    ): Promise<any>
}
