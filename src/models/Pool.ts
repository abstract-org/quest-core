// src/models/pool.ts
// ...

import { IPool } from '@/interfaces/IPool'
import { BaseModel } from './Base'
import { IDatabase } from '@/interfaces/IDatabase'

export class Pool extends BaseModel<IPool> implements IPool {
    id: string
    positions: string[]
    created_at: Date
    published_at: Date
    updated_at: Date
    quest_right_hash: string
    hash: string
    type: string
    kind: string
    quest_left_hash: string

    constructor(db: IDatabase, data: IPool) {
        super(db, data)
        this.id = data.id
        this.positions = data.positions
        this.created_at = data.created_at
        this.published_at = data.published_at
        this.updated_at = data.updated_at
        this.quest_right_hash = data.quest_right_hash
        this.hash = data.hash
        this.type = data.type
        this.kind = data.kind
        this.quest_left_hash = data.quest_left_hash
    }
}
