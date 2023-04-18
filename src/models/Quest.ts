// src/models/quest.ts
// ...

import { IQuest } from '@/interfaces/IQuest'
import { BaseModel } from './Base'
import { IDatabase } from '@/interfaces/IDatabase'

export class Quest extends BaseModel<IQuest> implements IQuest {
    id: string
    updated_at: Date
    created_at: Date
    published_at: Date
    deleted_at: Date
    initial_balance: number
    hash: string
    kind: string
    content: string
    creator_hash: string

    constructor(db: IDatabase, data: IQuest) {
        super(db, data)
        this.id = data.id
        this.updated_at = data.updated_at
        this.created_at = data.created_at
        this.published_at = data.published_at
        this.deleted_at = data.deleted_at
        this.initial_balance = data.initial_balance
        this.hash = data.hash
        this.kind = data.kind
        this.content = data.content
        this.creator_hash = data.creator_hash
    }
}
