import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async register({request, response}: HttpContext) {
    try {
      const data = request.only(['full_name', 'email', 'role', 'password']);
      const exists = await User.query().where('email', data.email).first()
      if(!exists){
        const user = await User.create(data);
        const token = await User.accessTokens.create(user);
        return response.json({
          message: 'Operación existosa',
          type: 'Bearer',
          token: token.value!.release()
        })
      }else{
        return response.badRequest({
          message: 'Ya existe una cuenta con este correo'
        })
      }
    } catch (error) {
      return response.badRequest({
        message: "Intente más tarde. Servicio no Disponible."
      })
    }
    
  }
  
  async loging({request, response}: HttpContext) {
    try {
      const data = request.only(['email', 'password']);
      const user = await User.verifyCredentials(data.email, data.password)
      const token = await User.accessTokens.create(user)

      return response.json({
        message: 'Operación existosa',
        type: 'Bearer',
        token: token.value!.release()
      })

    } catch (error) {
      return response.badRequest({
        message: "Revise sus credenciales."
      })
    }
  }
  
  async logout({auth, response}: HttpContext) {
    try {
      const userId = await auth.user?.id
      const user = await User.findOrFail(userId)
      await User.accessTokens.delete(user, user.id)

      return response.json({
        message: 'Operación existosa',
        type: 'Bearer'
      })

    } catch (error) {
      return response.badRequest({
        message: "Revise sus credenciales."
      })
    }
  }
  
  async me({auth, response}: HttpContext) {
    try {
      await auth.authenticate()
      const user = await auth.getUserOrFail()

      return response.json({
        message: 'Operación existosa',
        data: user
      })

    } catch (error) {
      return response.badRequest({
        message: "Revise sus credenciales."
      })
    }
  }
  
}