import { consumer } from '~infra/rabbitmq/consumer'

export class ConsumeMessageService {
  async handle () {
    consumer()
  }
}
