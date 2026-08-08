import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare reference: string

    @column()
    declare description: string

    @column()
    declare image_url: string | null

    @column()
    declare category: string | null

    @column()
    declare price: number | null

    @column()
    declare tax: number | null

    @column()
    declare stock: number | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: any

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: any
}