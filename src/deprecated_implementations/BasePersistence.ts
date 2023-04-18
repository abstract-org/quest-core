import mitt, { Emitter } from 'mitt'
import { IPersistence } from '..'

export abstract class BasePersistence implements IPersistence {
    constructor(protected events: Emitter<any>) {
        events.on('questCreated', this.handleQuestCreated.bind(this))
    }

    abstract getQuests(kind?: string, limit?: number): Promise<any[]>
    abstract getQuest(
        kind?: string,
        content?: string,
        hashAddress?: string
    ): Promise<any>
    abstract getPool(token0?: string, token1?: string): Promise<any>
    abstract getPoolPositions(poolAddress: string): Promise<any[]>
    abstract getPoolState(poolAddress: string): Promise<any>
    abstract getWallet(hash: string): Promise<any>
    abstract initQuest(
        kind: string,
        content: string,
        symbol?: string
    ): Promise<any>
    abstract initPool(
        token0: string,
        token1: string,
        startingPrice: number
    ): Promise<any>
    abstract initWallet(address: string): Promise<any>
    abstract initRouter(quests: any[], pools: any[]): Promise<any>
    abstract citeQuest(
        crossPool: any,
        citedPool: any,
        citingPool: any,
        amount: number
    ): Promise<any>

    protected handleQuestCreated(
        kind: string,
        content: string,
        symbol?: string
    ): void {
        // Save the quest to the database or perform other actions as needed
    }
}
