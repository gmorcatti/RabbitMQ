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

    await server.publishInExchange('amq.direct', 'rota', JSON.stringify({
      mandou: 'sim',
    }))

    return res.send(req.body)
  }

  async consumeMessage (req: Request, res: Response) {
    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.consume('test', (message) => {
      console.log(message?.content.toString(), new Date())
    })

    return res.send('OK')
  }
}
