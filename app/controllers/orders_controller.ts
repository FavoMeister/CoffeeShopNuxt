import Order from '#models/order';
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    const page = request.input('page');
    const limit = request.input('limit', 10) // Valor por defecto si no viene limit
    
    let all: any

    if (page) {
      all = await Order.query().paginate(page, limit)
    } else {
      all = await Order.all()
    }

    return response.json({
      message: "Operación Exitosa index",
      data: all
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all(); // we can use only() and except()

    const model = await Order.create(data);
    return response.json({
      message: "Orden creada exitosa",
      data: model
    })

    return response.badRequest({
      message: "Operación no exitosa"
    });
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const data = await Order.findOrFail(params.id);
    return response.json({
      message: "Operación exitosa",
      data
    });
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    let order = await Order.findOrFail(params.id)

    if (order) {
      /* const data = request.except(['id']);
      order.user = data.user;
      order.client = data.client;
      order.table = data.table;
      order.detail = data.detail;
      order.total = data.total;
      order.save(); */
      const data = request.except(['id'])
      order.merge(data)
      await order.save()

      return response.json({
        message: "Orden fue actualizada exitosamente",
        data: order
      });
    }
    return response.badRequest({
      message: "Orden no fue actualizada",
      order
    });
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    if (order) {
      await order.delete();
      return response.json({
        message: "Orden eliminada",
        data: order
      });
    }
    return response.badRequest({
      message: "Orden no eliminada",
      order
    });
  }
}