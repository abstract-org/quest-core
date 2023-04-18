// src/adapters/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { IDatabase } from '../interfaces/IDatabase'

export class SupabaseAdapter implements IDatabase {
    private supabase: SupabaseClient

    constructor(supabaseUrl: string, supabaseKey: string) {
        this.supabase = createClient(supabaseUrl, supabaseKey)
    }

    connect(): void {}

    async find(table: string, filter: Record<string, unknown>): Promise<any[]> {
        const { data, error } = await this.supabase
            .from(table)
            .select()
            .match(filter)

        if (error) {
            throw error
        }

        return data || []
    }

    async findOne(
        table: string,
        filter: Record<string, unknown>
    ): Promise<any | null> {
        const { data, error } = await this.supabase
            .from(table)
            .select()
            .match(filter)
            .limit(1)

        if (error) {
            throw error
        }

        return data ? data[0] : null
    }

    async create(table: string, data: Record<string, unknown>): Promise<any> {
        const { data: newData, error } = await this.supabase
            .from(table)
            .insert(data)

        if (error) {
            throw error
        }

        return newData
    }

    async update(
        table: string,
        filter: Record<string, unknown>,
        data: Record<string, unknown>
    ): Promise<any> {
        const { data: updatedData, error } = await this.supabase
            .from(table)
            .update(data)
            .match(filter)

        if (error) {
            throw error
        }

        return updatedData
    }

    async delete(table: string, filter: Record<string, unknown>): Promise<any> {
        const { data: deletedData, error } = await this.supabase
            .from(table)
            .delete()
            .match(filter)

        if (error) {
            throw error
        }

        return deletedData
    }
}
