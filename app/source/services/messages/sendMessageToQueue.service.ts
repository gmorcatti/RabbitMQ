import env from '~config/env'
import { AppError } from '~config/errors/AppError'
import RabbitMQServer from '~infra/rabbitmq'

export class SendMessageToQueueService {
  async handle (queue: string, message: object | string) {
    if (!queue) {
      throw new AppError('queue name was not informed')
    }

    if (!message) {
      throw new AppError('The message to send was not informed')
    }

    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.publishInQueue(queue, JSON.stringify(message))
  }
}
