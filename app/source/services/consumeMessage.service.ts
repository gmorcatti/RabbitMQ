import env from '~config/env'
import RabbitMQServer from '~infra/rabbitmq'

export class ConsumeMessageService {
  async handle () {
    const server = new RabbitMQServer(env.rabbitMQ.uri)
    await server.start()

    await server.consume('test', (message) => {
      console.log(message?.content.toString(), new Date())
    })
  }
}
