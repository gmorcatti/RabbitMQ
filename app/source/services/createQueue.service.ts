import env from '~config/env'
import { AppError } from '~config/errors/AppError'
import RabbitMQServer from '~infra/rabbitmq'

export class CreateQueueService {
  async handle (queue: string) {
    if (!queue) {
      throw new AppError("Queue name wasn't informed")
    }

    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.createQueue(queue)
  }
}
