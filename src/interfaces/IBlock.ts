// src/interfaces/block.ts
export interface IBlock {
    path: string
    amount_in: number
    amount_out: number
    created_at: Date
    hash: string
    pool_hash: string
    action: string
}
