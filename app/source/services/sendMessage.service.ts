import env from '~config/env'
import RabbitMQServer from '~infra/rabbitmq'

export class SendMessageService {
  async handle () {
    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.publishInQueue('test', JSON.stringify({
      mandou: 'sim',
    }))

    await server.publishInExchange('amq.direct', 'rota', JSON.stringify({
      mandou: 'sim',
    }))
  }
}
