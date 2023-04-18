// src/models/wallet.ts
import { IWallet } from '@/interfaces/IWallet'
import { IDatabase } from '@/interfaces/IDatabase'
import { BaseModel } from './Base'

export class Wallet extends BaseModel<IWallet> implements IWallet {
    id: string
    created_at: Date
    name: string
    hash: string

    constructor(db: IDatabase, data: IWallet) {
        super(db, data)
        this.db = db
        this.id = data.id
        this.created_at = data.created_at
        this.name = data.name
        this.hash = data.hash
    }

    static async getWalletByHash(
        db: IDatabase,
        hash: string
    ): Promise<Wallet | null> {
        const data = await db.findOne('wallets', { hash })
        return data ? new Wallet(db, data) : null
    }

    static async getWalletBalancesByWalletHash(
        db: IDatabase,
        walletHash: string
    ): Promise<any[] | null> {
        const data = await db.find('wallet_balances', {
            wallet_hash: walletHash
        })
        return data
    }
}
