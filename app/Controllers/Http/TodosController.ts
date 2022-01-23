import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
  public async index({ request }: HttpContextContract ) {
    const page = request.input('page', 1)
    const limit = request.input('per_page',10)
    const todos = await Todo.query().paginate(page, limit)
    return todos
  }

  public async store({request,response}:HttpContextContract) {
    Todo.create({ title: request.input('title'), is_complete: false })
    return response.send('created');
  }
  public async update({ request, response, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    todo.is_complete = true
    todo.save()
 
    return response.status(204).send(todo);
  }
}
