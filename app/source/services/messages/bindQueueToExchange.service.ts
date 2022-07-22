import env from '~config/env'
import { AppError } from '~config/errors/AppError'
import RabbitMQServer from '~infra/rabbitmq'

export class BindQueueToExchangeService {
  async handle (queue: string, exchange: string) {
    if (!queue || !exchange) {
      throw new AppError('Queue and Exchange names are required')
    }

    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.bindQueueToExchange(queue, exchange)
  }
}
