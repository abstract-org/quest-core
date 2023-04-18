import { PoolData, QuestData, WalletData } from '../../types'

export interface IDataStoreAdapter {
    createPool(poolData: PoolData): Promise<void>
    createQuest(questData: QuestData): Promise<void>
    createWallet(walletData: WalletData): Promise<void>
    getAllPools(): Promise<PoolData[]>
    getAllQuests(): Promise<QuestData[]>
    getAllWallets(): Promise<WalletData[]>
    getPoolsByHashes(hashes: string[]): Promise<PoolData[]>
    getQuestByHash(hash: string): Promise<QuestData>
    getWalletByHash(hash: string): Promise<WalletData>
    updatePool(poolData: PoolData): Promise<void>
    updateQuest(questData: QuestData): Promise<void>
    updateWallet(walletData: WalletData): Promise<void>
}
