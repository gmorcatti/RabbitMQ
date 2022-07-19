import { Request, Response } from 'express'

import { ConsumeMessageService } from '~src/services/consumeMessage.service'
import { CreateExchangeService } from '~src/services/createExchange.service'
import { CreateQueueService } from '~src/services/createQueue.service'
import { SendMessageService } from '~src/services/sendMessage.service'

const sendMessageService = new SendMessageService()
const consumeMessageService = new ConsumeMessageService()
const createQueueService = new CreateQueueService()
const createExchangeService = new CreateExchangeService()

export class MessageController {
  async send (req: Request, res: Response) {
    await sendMessageService.handle()
    return res.send(req.body)
  }

  async consume (_: Request, res: Response) {
    await consumeMessageService.handle()
    return res.send('OK')
  }

  async createQueue (req: Request, res: Response) {
    await createQueueService.handle(req.body.name, req.body.options)
    return res.send('OK')
  }

  async createExchange (req: Request, res: Response) {
    await createExchangeService.handle(req.body.name, req.body.type, req.body.options)
    return res.send('OK')
  }
}
