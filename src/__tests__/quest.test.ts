// src/__tests__/quest.test.ts
import { Quest } from '../models/Quest'
import { IDatabase } from '../interfaces/IDatabase'

type MockedFunctions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
        ? jest.MockedFunction<T[K]>
        : T[K]
}

type MockDb = IDatabase & MockedFunctions<IDatabase>

let mockDb: MockDb = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}

describe('Quest', () => {
    describe('constructor', () => {
        it('should initialize class properties correctly', () => {
            const data = {
                id: 'abc123',
                updated_at: new Date(),
                created_at: new Date(),
                published_at: new Date(),
                deleted_at: new Date(),
                initial_balance: 100,
                hash: 'def456',
                kind: 'treasure-hunt',
                content: 'Find the treasure!',
                creator_hash: 'ghi789'
            }

            const quest = new Quest(mockDb, data)
            expect(quest.id).toBe(data.id)
            expect(quest.updated_at).toBe(data.updated_at)
            expect(quest.created_at).toBe(data.created_at)
            expect(quest.published_at).toBe(data.published_at)
            expect(quest.deleted_at).toBe(data.deleted_at)
            expect(quest.initial_balance).toBe(data.initial_balance)
            expect(quest.hash).toBe(data.hash)
            expect(quest.kind).toBe(data.kind)
            expect(quest.content).toBe(data.content)
            expect(quest.creator_hash).toBe(data.creator_hash)
        })
    })

    describe('static create', () => {
        it('should create a new Quest instance and call create method on the database', async () => {
            const data = {
                initial_balance: 100,
                hash: 'def456',
                kind: 'treasure-hunt',
                content: 'Find the treasure!',
                creator_hash: 'ghi789'
            }
            const createdData = {
                ...data,
                id: 'abc123',
                updated_at: new Date(),
                created_at: new Date(),
                published_at: new Date(),
                deleted_at: new Date()
            }
            mockDb.create.mockResolvedValueOnce(createdData)

            const quest = await Quest.create(mockDb, 'quests', data)
            expect(quest).toBeInstanceOf(Quest)
            expect(quest.id).toBe(createdData.id)
            expect(quest.updated_at).toBe(createdData.updated_at)
            expect(quest.created_at).toBe(createdData.created_at)
            expect(quest.published_at).toBe(createdData.published_at)
            expect(quest.deleted_at).toBe(createdData.deleted_at)
            expect(quest.initial_balance).toBe(createdData.initial_balance)
            expect(quest.hash).toBe(createdData.hash)
            expect(quest.kind).toBe(createdData.kind)
            expect(quest.content).toBe(createdData.content)
            expect(quest.creator_hash).toBe(createdData.creator_hash)

            expect(mockDb.create).toHaveBeenCalledWith('quests', data)
        })
    })

    describe('getByHash', () => {
        it('should retrieve a single Quest instance by hash', async () => {
            const data = {
                id: 'abc123',
                updated_at: new Date(),
                created_at: new Date(),
                published_at: new Date(),
                deleted_at: new Date(),
                initial_balance: 100,
                hash: 'def456',
                kind: 'treasure-hunt',
                content: 'Find treasure',
                creator_hash: 'ghi789'
            }
            mockDb.findOne.mockResolvedValueOnce({
                ...data,
                creator_hash: data.creator_hash
            })

            const quest = await Quest.getByHash(mockDb, 'quests', data.hash)
            expect(quest).toBeInstanceOf(Quest)
            expect(quest.id).toBe(data.id)
            expect(quest.updated_at).toBe(data.updated_at)
            expect(quest.created_at).toBe(data.created_at)
            expect(quest.published_at).toBe(data.published_at)
            expect(quest.deleted_at).toBe(data.deleted_at)
            expect(quest.initial_balance).toBe(data.initial_balance)
            expect(quest.hash).toBe(data.hash)
            expect(quest.kind).toBe(data.kind)
            expect(quest.content).toBe(data.content)
            expect(quest.creator_hash).toBe(data.creator_hash)

            expect(mockDb.findOne).toHaveBeenCalledWith('quests', {
                hash: data.hash
            })
        })

        it('should return null if no Quest instance is found by hash', async () => {
            mockDb.findOne.mockResolvedValueOnce(null)

            const quest = await Quest.getByHash(mockDb, 'quests', 'def456')
            expect(quest).toBeNull()

            expect(mockDb.findOne).toHaveBeenCalledWith('quests', {
                hash: 'def456'
            })
        })
    })

    describe('getOne', () => {
        it('should retrieve a single Quest instance by filter', async () => {
            const data = {
                id: 'abc123',
                updated_at: new Date(),
                created_at: new Date(),
                published_at: new Date(),
                deleted_at: new Date(),
                initial_balance: 100,
                hash: 'def456',
                kind: 'treasure-hunt',
                content: 'Find the treasure!',
                creator_hash: 'ghi789'
            }
            mockDb.findOne.mockResolvedValueOnce(data)

            const quest = await Quest.getOne(mockDb, 'quests', {
                kind: 'treasure-hunt'
            })
            expect(quest).toBeInstanceOf(Quest)
            expect(quest.id).toBe(data.id)
            expect(quest.updated_at).toBe(data.updated_at)
            expect(quest.created_at).toBe(data.created_at)
            expect(quest.published_at).toBe(data.published_at)
            expect(quest.deleted_at).toBe(data.deleted_at)
            expect(quest.initial_balance).toBe(data.initial_balance)
            expect(quest.hash).toBe(data.hash)
            expect(quest.kind).toBe(data.kind)
            expect(quest.content).toBe(data.content)
            expect(quest.creator_hash).toBe(data.creator_hash)

            expect(mockDb.findOne).toHaveBeenCalledWith('quests', {
                kind: 'treasure-hunt'
            })
        })

        it('should return null if no Quest instance is found by filter', async () => {
            mockDb.findOne.mockResolvedValueOnce(null)

            const quest = await Quest.getOne(mockDb, 'quests', {
                kind: 'treasure-hunt'
            })
            expect(quest).toBeNull()

            expect(mockDb.findOne).toHaveBeenCalledWith('quests', {
                kind: 'treasure-hunt'
            })
        })
    })

    describe('getAll', () => {
        it('should retrieve all Quest instances from the database', async () => {
            const data = [
                {
                    id: 'abc123',
                    updated_at: new Date(),
                    created_at: new Date(),
                    published_at: new Date(),
                    deleted_at: new Date(),
                    initial_balance: 100,
                    hash: 'def456',
                    kind: 'treasure-hunt',
                    content: 'Find the treasure!',
                    creator_hash: 'ghi789'
                },
                {
                    id: 'def456',
                    updated_at: new Date(),
                    created_at: new Date(),
                    published_at: new Date(),
                    deleted_at: new Date(),
                    initial_balance: 200,
                    hash: 'ghi789',
                    kind: 'monster-slaying',
                    content: 'Slay the monster!',
                    creator_hash: 'jkl012'
                }
            ]
            mockDb.find.mockResolvedValueOnce(data)

            const quests = await Quest.getAll(mockDb, 'quests')
            expect(quests.length).toBe(data.length)
            expect(quests[0]).toBeInstanceOf(Quest)
            expect(quests[0].id).toBe(data[0].id)
            expect(quests[0].updated_at).toBe(data[0].updated_at)
            expect(quests[0].created_at).toBe(data[0].created_at)
            expect(quests[0].published_at).toBe(data[0].published_at)
            expect(quests[0].deleted_at).toBe(data[0].deleted_at)
            expect(quests[0].initial_balance).toBe(data[0].initial_balance)
            expect(quests[0].hash).toBe(data[0].hash)
            expect(quests[0].kind).toBe(data[0].kind)
            expect(quests[0].content).toBe(data[0].content)
            expect(quests[0].creator_hash).toBe(data[0].creator_hash)
            expect(quests[1]).toBeInstanceOf(Quest)
            expect(quests[1].id).toBe(data[1].id)
            expect(quests[1].updated_at).toBe(data[1].updated_at)
            expect(quests[1].created_at).toBe(data[1].created_at)
            expect(quests[1].published_at).toBe(data[1].published_at)
            expect(quests[1].deleted_at).toBe(data[1].deleted_at)
            expect(quests[1].initial_balance).toBe(data[1].initial_balance)
            expect(quests[1].hash).toBe(data[1].hash)
            expect(quests[1].kind).toBe(data[1].kind)
            expect(quests[1].content).toBe(data[1].content)
            expect(quests[1].creator_hash).toBe(data[1].creator_hash)

            expect(mockDb.find).toHaveBeenCalledWith('quests', {})
        })
    })

    describe('getAllWithFilters', () => {
        xit('should retrieve all Quest instances from the database matching a filter', async () => {
            const data = [
                {
                    id: 'abc123',
                    updated_at: new Date(),
                    created_at: new Date(),
                    published_at: new Date(),
                    deleted_at: new Date(),
                    initial_balance: 100,
                    hash: 'def456',
                    kind: 'treasure-hunt',
                    content: 'Find the treasure!',
                    creator_hash: 'ghi789'
                },
                {
                    id: 'def456',
                    updated_at: new Date(),
                    created_at: new Date(),
                    published_at: new Date(),
                    deleted_at: new Date(),
                    initial_balance: 200,
                    hash: 'ghi789',
                    kind: 'monster-slaying',
                    content: 'Slay the monster!',
                    creator_hash: 'jkl012'
                }
            ]
            const filter = { creator_hash: 'ghi789' }
            console.log(data[0])
            mockDb.find.mockResolvedValueOnce([data[0]])

            const quests = await Quest.getAllWithFilters(
                mockDb,
                'quests',
                filter
            )
            expect(quests.length).toBe(1)
            expect(quests[0]).toBeInstanceOf(Quest)
            expect(quests[0].id).toBe(data[0].id)
            expect(quests[0].updated_at).toBe(data[0].updated_at)
            expect(quests[0].created_at).toBe(data[0].created_at)
            expect(quests[0].published_at).toBe(data[0].published_at)
            expect(quests[0].deleted_at).toBe(data[0].deleted_at)
            expect(quests[0].initial_balance).toBe(data[0].initial_balance)
            expect(quests[0].hash).toBe(data[0].hash)
            expect(quests[0].kind).toBe(data[0].kind)
            expect(quests[0].content).toBe(data[0].content)
            expect(quests[0].creator_hash).toBe(data[0].creator_hash)

            expect(mockDb.find).toHaveBeenCalledWith('quests', filter)
        })

        it('should retrieve Quest instances from the database matching a filter with a limit and offset', async () => {
            const data = [
                {
                    id: 'abc123',
                    updated_at: new Date(),
                    created_at: new Date(),
                    published_at: new Date(),
                    deleted_at: new Date(),
                    initial_balance: 100,
                    hash: 'def456',
                    kind: 'treasure-hunt',
                    content: 'Find the treasure!',
                    creator_hash: 'ghi789'
                },
                {
                    id: 'def456',
                    updated_at: new Date(),
                    created_at: new Date(),
                    published_at: new Date(),
                    deleted_at: new Date(),
                    initial_balance: 200,
                    hash: 'ghi789',
                    kind: 'monster-slaying',
                    content: 'Slay the monster!',
                    creator_hash: 'jkl012'
                }
            ]
            const filter = { creator_hash: 'ghi789' }
            const limit = 1
            const offset = 1
            mockDb.find.mockResolvedValueOnce([data[1]])

            const quests = await Quest.getAllWithFilters(
                mockDb,
                'quests',
                filter,
                limit,
                offset
            )
            expect(quests.length).toBe(1)
            expect(quests[0]).toBeInstanceOf(Quest)
            expect(quests[0].id).toBe(data[1].id)
            expect(quests[0].updated_at).toBe(data[1].updated_at)
            expect(quests[0].created_at).toBe(data[1].created_at)
            expect(quests[0].published_at).toBe(data[1].published_at)
            expect(quests[0].deleted_at).toBe(data[1].deleted_at)
            expect(quests[0].initial_balance).toBe(data[1].initial_balance)
            expect(quests[0].hash).toBe(data[1].hash)
            expect(quests[0].kind).toBe(data[1].kind)
            expect(quests[0].content).toBe(data[1].content)
            expect(quests[0].creator_hash).toBe(data[1].creator_hash)

            expect(mockDb.find).toHaveBeenCalledWith(
                'quests',
                filter,
                limit,
                offset
            )
        })
    })

    describe('updateByHash', () => {
        xit('should update a Quest instance by hash', async () => {
            const data = {
                id: 'abc123',
                updated_at: new Date(),
                created_at: new Date(),
                published_at: new Date(),
                deleted_at: new Date(),
                initial_balance: 100,
                hash: 'def456',
                kind: 'treasure-hunt',
                content: 'Find the treasure!',
                creator_hash: 'ghi789'
            }
            const updatedData = {
                updated_at: new Date(),
                initial_balance: 200,
                kind: 'monster-slaying'
            }
            mockDb.update.mockResolvedValueOnce(updatedData)

            const quest = await Quest.updateByHash(
                mockDb,
                'quests',
                data.hash,
                updatedData
            )
            expect(quest).toBeInstanceOf(Quest)
            expect(quest.id).toBe(data.id)
            expect(quest.updated_at).toBe(updatedData.updated_at)
            expect(quest.created_at).toBe(data.created_at)
            expect(quest.published_at).toBe(data.published_at)
            expect(quest.deleted_at).toBe(data.deleted_at)
            expect(quest.initial_balance).toBe(updatedData.initial_balance)
            expect(quest.hash).toBe(data.hash)
            expect(quest.kind).toBe(updatedData.kind)
            expect(quest.content).toBe(data.content)
            expect(quest.creator_hash).toBe(data.creator_hash)

            expect(mockDb.update).toHaveBeenCalledWith(
                'quests',
                { hash: data.hash },
                updatedData
            )
        })

        it('should return null if no Quest instance with the given hash is found to update', async () => {
            const hash = 'abc123'
            mockDb.update.mockResolvedValueOnce(null)

            const quest = await Quest.updateByHash(mockDb, 'quests', hash, {})
            expect(quest).toBeNull()

            expect(mockDb.update).toHaveBeenCalledWith('quests', { hash }, {})
        })
    })

    describe('deleteByHash', () => {
        it('should delete a Quest instance by hash', async () => {
            const data = {
                id: 'abc123',
                updated_at: new Date(),
                created_at: new Date(),
                published_at: new Date(),
                deleted_at: new Date(),
                initial_balance: 100,
                hash: 'def456',
                kind: 'treasure-hunt',
                content: 'Find the treasure!',
                creator_hash: 'ghi789'
            }
            mockDb.delete.mockResolvedValueOnce(true)

            const success = await Quest.deleteByHash(
                mockDb,
                'quests',
                data.hash
            )
            expect(success).toBe(true)

            expect(mockDb.delete).toHaveBeenCalledWith('quests', {
                hash: data.hash
            })
        })

        it('should return false if no Quest instance with the given hash is found to delete', async () => {
            const hash = 'abc123'
            mockDb.delete.mockResolvedValueOnce(false)

            const success = await Quest.deleteByHash(mockDb, 'quests', hash)
            expect(success).toBe(false)

            expect(mockDb.delete).toHaveBeenCalledWith('quests', { hash })
        })
    })
})
