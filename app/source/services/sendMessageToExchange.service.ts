import env from '~config/env'
import { AppError } from '~config/errors/AppError'
import RabbitMQServer from '~infra/rabbitmq'

export class SendMessageToExchangeService {
  async handle (exchange: string, message: object | string, routingKey = '') {
    if (!exchange) {
      throw new AppError('queue name was not informed')
    }

    if (!message) {
      throw new AppError('The message to send was not informed')
    }

    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.publishInExchange(exchange, routingKey, JSON.stringify(message))
  }
}
