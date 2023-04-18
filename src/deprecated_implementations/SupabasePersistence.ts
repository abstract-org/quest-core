import { SupabaseClient } from '@supabase/supabase-js'
import { BasePersistence } from './BasePersistence'
import { Emitter } from 'mitt'

export class SupabasePersistence extends BasePersistence {
    constructor(events: Emitter<any>, private supabase: SupabaseClient) {
        super(events)
    }

    getQuest(
        kind?: string,
        content?: string,
        hashAddress?: string
    ): Promise<any> {
        throw new Error('Method not implemented.')
    }
    getWallet(hash: string): Promise<any> {
        throw new Error('Method not implemented.')
    }
    initQuest(kind: string, content: string, symbol?: string): Promise<any> {
        throw new Error('Method not implemented.')
    }
    initPool(
        token0: string,
        token1: string,
        startingPrice: number
    ): Promise<any> {
        throw new Error('Method not implemented.')
    }
    initWallet(address: string): Promise<any> {
        throw new Error('Method not implemented.')
    }
    initRouter(quests: any[], pools: any[]): Promise<any> {
        throw new Error('Method not implemented.')
    }
    citeQuest(
        crossPool: any,
        citedPool: any,
        citingPool: any,
        amount: number
    ): Promise<any> {
        this.events.on('questCited', () => {
            // store in DB cited data
        })
        throw new Error('Method not implemented.')
    }

    async getQuests(kind?: string, limit?: number): Promise<any[]> {
        // Implement Supabase-specific logic
        return new Promise(null)
    }

    async getPool(token0?: string, token1?: string): Promise<any[]> {
        // Implement Supabase-specific logic
        return new Promise(null)
    }

    async getPoolPositions(kind?: string, limit?: number): Promise<any[]> {
        // Implement Supabase-specific logic
        return new Promise(null)
    }

    async getPoolState(kind?: string, limit?: number): Promise<any[]> {
        // Implement Supabase-specific logic
        return new Promise(null)
    }
}
