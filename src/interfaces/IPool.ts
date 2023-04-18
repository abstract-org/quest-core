// src/interfaces/pool.ts
export interface IPool {
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
}
