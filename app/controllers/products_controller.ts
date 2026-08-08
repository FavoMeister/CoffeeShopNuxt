import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ response, request}: HttpContext) {
    const page = request.input('page');
    let all = [];
    if(page){
      const limit = request.input('limit');
      all = await Product.query().paginate(page, limit)
    }else{
      all = await Product.all()
    }
    return response.json({
      message: "Operaci'on Exitosa",
      data: all
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all(); // we can use only and except
    const exist = await Product.query().where('reference', data.reference);
    if(!exist){
      const model =  await Product.create(data);
      return response.json({
        message: "Operaci'on exitosa",
        data: model
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const data = await Product.findByOrFail(params.id);
    return response.json({
      message: "Operaci'on exitosa",
      data
    });
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    let product = await Product.findByOrFail(params.id);
    if(product){
      const data = request.except(['id']);
      product.name = data.name;
      product.reference = data.reference;
      product.description = data.description;
      product.image_url = data.image_url;
      product.category = data.category;
      product.price = data.price;
      product.tax = data.tax;
      product.stock = data.stock;
      product.save();

      return response.json({
        message: "Operación exitosa",
        data: product
      });
    }
    return response.badRequest({
      message: "Operación no exitosa",
      product
    });
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    let product = await Product.findByOrFail(params.id);
    if(product){
      product.delete();
      return response.json({
        message: "Operación exitosa",
        data: product
      });
    }
    return response.badRequest({
      message: "Operación no exitosa",
      product
    });
  }
}