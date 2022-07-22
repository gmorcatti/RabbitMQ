import RabbitMQServer from '.'

import env from '~config/env'
import { Jobs } from '~src/jobs'

export const consumer = async () => {
  const server = new RabbitMQServer(env.rabbitMQ.uri)
  await server.start()

  const queues = Object.entries(Jobs)

  await server.prefetch()

  const ConsumePromises = queues.map(async ([name, handler]) => {
    await server.createQueue(name)
    await server.consume(name, handler)
  })

  await Promise.all(ConsumePromises)
}
