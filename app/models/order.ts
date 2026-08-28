import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Order extends BaseModel {
    @column({ isPrimary: true})
    declare id: number

    @column()
    declare user: string

    @column()
    declare client: string

    @column()
    declare table: string

    @column({
        // Convierte el objeto/arreglo a String JSON antes de insertar en SQLite
        prepare: (value: any) => (value ? JSON.stringify(value) : null),
        // Si viene como String desde SQLite, lo convierte de vuelta a objeto JS al consultar
        consume: (value: any) => (typeof value === 'string' ? JSON.parse(value) : value),
    })
    declare detail: Record<string, any>[] | any

    @column()
    declare total: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: any

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: any
}