// src/interfaces/wallet_balance.ts
export interface IWalletBalance {
    id: string
    balance: number
    created_at: Date
    quest_hash: string
    wallet_hash: string
}
