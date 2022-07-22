import RabbitMQServer from '.'

import env from '~config/env'

const consumeCallbacks = {
  'queue-test': (input: object) => {
    console.log('O Input é:', input)
  },
  'queue-test-2': (input: object) => {
    console.log('=======')
    console.log(input)
    console.log('=======')
  },
}

export const consumer = async () => {
  const server = new RabbitMQServer(env.rabbitMQ.uri)
  await server.start()

  const queues = Object.entries(consumeCallbacks)

  queues.forEach(([name, handler]) => {
    server.consume(name, handler)
  })
}
