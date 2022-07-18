import { Channel, connect, Connection } from 'amqplib'

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
}
