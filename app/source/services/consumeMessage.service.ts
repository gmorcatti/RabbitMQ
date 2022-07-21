import env from '~config/env'
import { AppError } from '~config/errors/AppError'
import RabbitMQServer from '~infra/rabbitmq'

export class ConsumeMessageService {
  async handle (queue: string) {
    if (!queue) {
      throw new AppError('Queue name are required')
    }

    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.consume(queue, (message) => {
      console.log(message?.content.toString(), new Date())
    })
  }
}
