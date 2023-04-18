// src/interfaces/pool_state.ts
export interface IPoolState {
    id: string
    cur_liq: number
    cur_price: number
    cur_pp: number
    cur_left: number
    cur_right: number
    quest_left_price: number
    quest_right_price: number
    quest_left_volume: number
    quest_right_volume: number
    created_at: Date
    block_hash: string
    pool_hash: string
}
