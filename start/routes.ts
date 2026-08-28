/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import ProductsController from '#controllers/products_controller'
import OrdersController from '#controllers/orders_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    /*
    |--------------------------------------------------------------------------
    | Rutas Públicas (Lectura)
    |--------------------------------------------------------------------------
    */
    router.group(() => {
      // Products
      router.get('products', [ProductsController, 'index'])
      router.get('products/:id', [ProductsController, 'show'])

      // Orders
      router.get('orders', [OrdersController, 'index'])
      router.get('orders/:id', [OrdersController, 'show'])
    })
    /*
    |--------------------------------------------------------------------------
    | Rutas Protegidas (Escritura, Edición y Borrado)
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        // Products
        router.post('products', [ProductsController, 'store'])
        router.put('products/:id', [ProductsController, 'update']) // Se recomienda PUT o PATCH para updates
        router.delete('products/:id', [ProductsController, 'destroy'])

        // Orders
        router.post('orders', [OrdersController, 'store'])
        router.put('orders/:id', [OrdersController, 'update'])
        router.delete('orders/:id', [OrdersController, 'destroy'])

        // Profile / Account
        router
          .group(() => {
            router.get('profile', [controllers.Profile, 'show'])
            router.post('logout', [controllers.AccessTokens, 'destroy'])
          })
          .prefix('account')
          .as('profile')
      })
      .use(
        middleware.auth({
          guards: ['api'], // Se especifica explícitamente el guard 'api'
        })
      )

    /*router
      .group(() => {
        router.get('/', [ProductsController, 'index'])
        router.post('/', [ProductsController, 'store'])
        router.get('/:id', [ProductsController, 'show'])
        router.post('/:id', [ProductsController, 'update'])
        router.delete('/:id', [ProductsController, 'destroy'])
      })
      .prefix('products')
      .as('products')
    router
      .group(() => {
        router.resource('orders', OrdersController).apiOnly()
      })*/
    /*
    |--------------------------------------------------------------------------
    | Autenticación
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    /*router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())*/
  })
  .prefix('/api/v1')
