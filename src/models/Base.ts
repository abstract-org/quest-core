// src/models/base.ts
import { IDatabase } from '@/interfaces/IDatabase'

export abstract class BaseModel<T> {
    protected db: IDatabase

    protected constructor(db: IDatabase, data: Partial<T>) {
        this.db = db
        Object.assign(this, data)
    }

    static async create<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string,
        data: Partial<T>
    ): Promise<T> {
        const createdData = await db.create(table, data)
        return new this(db, createdData)
    }

    static async getByHash<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string,
        hash: string
    ): Promise<T | null> {
        const data = await db.findOne(table, { hash })
        return data ? new this(db, data) : null
    }

    static async getOne<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string,
        filter: Record<string, unknown>
    ): Promise<T | null> {
        const data = await db.findOne(table, filter)
        return data ? new this(db, data) : null
    }

    static async getAll<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string
    ): Promise<T[]> {
        const dataList = await db.find(table, {})
        return dataList.map((data) => new this(db, data))
    }

    static async getAllWithFilters<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string,
        filter: Record<string, unknown>,
        limit?: number,
        offset?: number
    ): Promise<T[]> {
        const dataList = await db.find(table, filter, limit, offset)
        return dataList.map((data) => new this(db, data))
    }

    static async updateByHash<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string,
        hash: string,
        data: Partial<T>
    ): Promise<T | null> {
        const updatedData = await db.update(table, { hash }, data)
        return updatedData ? new this(db, updatedData) : null
    }

    static async deleteByHash<T extends BaseModel<any>>(
        this: { new (db: IDatabase, data: Partial<T>): T },
        db: IDatabase,
        table: string,
        hash: string
    ): Promise<boolean> {
        return db.delete(table, { hash })
    }
}
