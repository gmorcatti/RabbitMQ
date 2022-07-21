
import { Router } from 'express'

import { MessageController } from '~controllers/message.controller'

const router = Router()

const messageController = new MessageController()

router.post('/send-message', messageController.send)
router.get('/read-message', messageController.consume)
router.post('/create-queue', messageController.createQueue)
router.post('/create-exchange', messageController.createExchange)
router.post('/bind-queue', messageController.bindQueueToExchange)

export default router
