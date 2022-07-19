import { Request, Response } from 'express'

import { ConsumeMessageService } from '~src/services/consumeMessage.service'
import { SendMessageService } from '~src/services/sendMessage.service'

const sendMessageService = new SendMessageService()
const consumeMessageService = new ConsumeMessageService()
export class MessageController {
  async send (req: Request, res: Response) {
    sendMessageService.handle()
    return res.send(req.body)
  }

  async consume (_: Request, res: Response) {
    consumeMessageService.handle()
    return res.send('OK')
  }
}
