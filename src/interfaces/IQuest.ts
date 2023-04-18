// src/interfaces/quest.ts
export interface IQuest {
    updated_at: Date
    created_at: Date
    published_at: Date
    deleted_at: Date
    id: string
    initial_balance: number
    hash: string
    kind: string
    content: string
    creator_hash: string
}
