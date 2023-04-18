// src/models/block.ts
// ...

import { IBlock } from '@/interfaces/IBlock'
import { BaseModel } from './Base'
import { IDatabase } from '@/interfaces/IDatabase'

export class Block extends BaseModel<IBlock> implements IBlock {
    path: string
    amount_in: number
    amount_out: number
    created_at: Date
    hash: string
    pool_hash: string
    action: string

    constructor(db: IDatabase, data: IBlock) {
        super(db, data)
        this.path = data.path
        this.amount_in = data.amount_in
        this.amount_out = data.amount_out
        this.created_at = data.created_at
        this.hash = data.hash
        this.pool_hash = data.pool_hash
        this.action = data.action
    }
}
