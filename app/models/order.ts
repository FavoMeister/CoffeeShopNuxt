import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Order extends BaseModel {
    @column({ isPrimary: true})
    declare id: number

    @column()
    declare user: String

    @column()
    declare client: string

    @column()
    declare table: string

    @column()
    declare detail: string

    @column()
    declare total: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: any

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: any
}