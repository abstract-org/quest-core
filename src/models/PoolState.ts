import { IPoolState } from '@/interfaces/IPoolState'
import { BaseModel } from './Base'
import { IDatabase } from '@/interfaces/IDatabase'

export class PoolState extends BaseModel<IPoolState> implements IPoolState {
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

    constructor(db: IDatabase, data: IPoolState) {
        super(db, data)
        this.id = data.id
        this.cur_liq = data.cur_liq
        this.cur_pp = data.cur_pp
        this.cur_left = data.cur_left
        this.cur_right = data.cur_right
        this.quest_left_price = data.quest_left_price
        this.quest_right_price = data.quest_right_price
        this.quest_left_volume = data.quest_left_volume
        this.quest_right_volume = data.quest_right_volume
        this.created_at = data.created_at
        this.block_hash = data.block_hash
        this.pool_hash = data.pool_hash
    }
}
