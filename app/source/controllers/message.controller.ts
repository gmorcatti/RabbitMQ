import { Request, Response } from 'express'

import env from '~config/env'
import RabbitMQServer from '~infra/rabbitmq'

export class MessageController {
  async sendMessage (req: Request, res: Response) {
    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.publishInQueue('test', JSON.stringify({
      mandou: 'sim',
    }))

    return res.send(req.body)
  }
}
