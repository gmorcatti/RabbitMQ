import { Request, Response } from 'express'

import { BindQueueToExchangeService } from '~src/services/bindQueueToExchange.service'

import { ConsumeMessageService } from '~src/services/consumeMessage.service'
import { CreateExchangeService } from '~src/services/createExchange.service'
import { CreateQueueService } from '~src/services/createQueue.service'
import { SendMessageToExchangeService } from '~src/services/sendMessageToExchange.service'
import { SendMessageToQueueService } from '~src/services/sendMessageToQueue.service'

const sendMessageToQueueService = new SendMessageToQueueService()
const sendMessageToExchangeService = new SendMessageToExchangeService()
const consumeMessageService = new ConsumeMessageService()
const createQueueService = new CreateQueueService()
const createExchangeService = new CreateExchangeService()
const bindQueueToExchangeService = new BindQueueToExchangeService()

export class MessageController {
  async sendToQueue (req: Request, res: Response) {
    const { queue, message } = req.body

    await sendMessageToQueueService.handle(queue, message)

    return res.sendStatus(200)
  }

  async sendToExchange (req: Request, res: Response) {
    const { exchange, routingKey, message } = req.body

    await sendMessageToExchangeService.handle(exchange, message, routingKey)

    return res.sendStatus(200)
  }

  async consume (req: Request, res: Response) {
    const { queue } = req.body

    await consumeMessageService.handle(queue)

    return res.sendStatus(200)
  }

  async createQueue (req: Request, res: Response) {
    const { name, options } = req.body

    await createQueueService.handle(name, options)

    return res.sendStatus(200)
  }

  async createExchange (req: Request, res: Response) {
    const { name, type, options } = req.body

    await createExchangeService.handle(name, type, options)

    return res.sendStatus(200)
  }

  async bindQueueToExchange (req: Request, res: Response) {
    const { queue, exchange } = req.body

    await bindQueueToExchangeService.handle(queue, exchange)

    return res.sendStatus(200)
  }
}
