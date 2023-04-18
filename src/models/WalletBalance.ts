// src/models/wallet_balance.ts
import { IWalletBalance } from '@/interfaces/IWalletBalance'
import { IDatabase } from '@/interfaces/IDatabase'
import { BaseModel } from './Base'

export class WalletBalance
    extends BaseModel<IWalletBalance>
    implements IWalletBalance
{
    id: string
    balance: number
    created_at: Date
    quest_hash: string
    wallet_hash: string

    constructor(db: IDatabase, data: IWalletBalance) {
        super(db, data)
        this.db = db
        this.id = data.id
        this.balance = data.balance
        this.created_at = data.created_at
        this.quest_hash = data.quest_hash
        this.wallet_hash = data.wallet_hash
    }
}
