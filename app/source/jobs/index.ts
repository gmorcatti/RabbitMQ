import { QueueOneService } from '~services/consumers/queueOne.service'
import { QueueTwoService } from '~services/consumers/queueTwo.service'

export const Jobs = {
  QueueOne: new QueueOneService().handle,
  QueueTwo: new QueueTwoService().handle,
}
