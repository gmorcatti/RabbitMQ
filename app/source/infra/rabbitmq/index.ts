import { Channel, connect, Connection, ConsumeMessage } from 'amqplib'

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

  async consume (queue: string, callback: (message: ConsumeMessage | null) => void) {
    return this.channel.consume(queue, (message) => {
      if (!message) {
        return console.error('Message not found')
      }

      callback(message)
      this.channel.ack(message)
    })
  }
}
