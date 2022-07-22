import { Options } from 'amqplib'

import env from '~config/env'
import { AppError } from '~config/errors/AppError'
import { ExchangeType } from '~config/types/queue'
import RabbitMQServer from '~infra/rabbitmq'
import { valueExistsInEnum } from '~src/utils/valueExistsInEnum'

export class CreateExchangeService {
  async handle (exchange: string, type: ExchangeType, options?: Options.AssertExchange) {
    if (!exchange) {
      throw new AppError("Exchange name wasn't informed")
    }

    if (!valueExistsInEnum(type, ExchangeType)) {
      throw new AppError(`${type} is not a valid exchange type`)
    }

    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.createExchange(exchange, type, options)
  }
}
