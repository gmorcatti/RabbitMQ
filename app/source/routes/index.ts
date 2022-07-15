
import { Request, Response, Router } from 'express'

import env from '~config/env'

import RabbitMQServer from '~infra/rabbitmq'

const router = Router()

router.post('/send-message', async (req: Request, res: Response) => {
  const server = new RabbitMQServer(env.rabbitMQ.uri)
  await server.start()

  return res.send(req.body)
})

export default router
