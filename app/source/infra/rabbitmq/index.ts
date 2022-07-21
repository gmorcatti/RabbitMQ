import { Channel, connect, Connection, ConsumeMessage, Options } from 'amqplib'

import { ExchangeType } from '~config/types/queue'

export default class RabbitMQServer {
  private connection: Connection
  private channel: Channel

  constructor (private uri: string) {}

  async start (): Promise<void> {
    this.connection = await connect(this.uri)
    this.channel = await this.connection.createChannel()
  }

  async publishInQueue (queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async publishInExchange (exchange: string, routingKey: string, message: string): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }

  async consume (queue: string, callback: (message: ConsumeMessage | null) => void) {
    return this.channel.consume(queue, (message) => {
      if (!message) {
        return console.error('Message not found')
      }

      callback(message)
      this.channel.ack(message)
    })
  }

  async createQueue (queue: string, options?: Options.AssertQueue) {
    return this.channel.assertQueue(queue, options)
  }

  async createExchange (exchange: string, type: ExchangeType, options?: Options.AssertExchange) {
    return this.channel.assertExchange(exchange, type, options)
  }

  async bindQueueToExchange (queue: string, exchange: string, pattern = '') {
    return this.channel.bindQueue(queue, exchange, pattern)
  }
}
