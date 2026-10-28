import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  /* async index({ response, request}: HttpContext) {
    const page = request.input('page');
    let all = [];
    if(page){
      const limit = request.input('limit');
      all = await Product.query().paginate(page, limit)
    }else{
      all = await Product.all()
    }
    return response.json({
      message: "Operación Exitosa index",
      data: all
    })
  } */

  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit', 10)
    const search = request.input('search') || request.input('q') // Captura el término de búsqueda

    // Creamos la consulta base
    const query = Product.query()

    // Si el cliente envía un término de búsqueda, filtramos por nombre o descripción
    if (search) {
      query.where((builder) => {
        builder
          .where('name', 'LIKE', `%${search}%`)
          .orWhere('description', 'LIKE', `%${search}%`)
      })
    }

    let result

    // Si se pasa el parámetro page, paginamos los resultados
    if (page) {
      result = await query.paginate(page, limit)
    } else {
      result = await query.exec()
    }

    return response.json({
      message: 'Operación Exitosa index',
      data: result,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all(); // we can use only() and except()
    const exist = await Product.query().where('reference', data.reference).first();
    if(!exist){
      const model =  await Product.create(data);
      return response.json({
        message: "Operación exitosa",
        data: model
      })
    }
    return response.badRequest({
      message: "Operación no exitosa"
    });
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const data = await Product.findByOrFail("id", params.id);
    return response.json({
      message: "Operación exitosa",
      data
    });
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    let product = await Product.findByOrFail("id", params.id);
    if(product){
      const data = request.except(['id']);
      product.name = data.name;
      product.reference = data.reference;
      product.description = data.description;
      product.image_url = data.imageUrl;
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
    const product = await Product.findOrFail(params.id);
    if(product){
      await product.delete();
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