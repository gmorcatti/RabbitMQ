
import { Router } from 'express'

import { MessageController } from '~controllers/message.controller'

const router = Router()

const messageController = new MessageController()

router.post('/send-message', messageController.send)
router.get('/read-message', messageController.consume)
router.get('/create-queue', messageController.createQueue)

export default router
