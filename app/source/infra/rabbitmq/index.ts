import { Channel, connect, Connection } from 'amqplib'

export default class RabbitMQServer {
  private connection: Connection
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private channel: Channel

  constructor (private uri: string) {}

  async start (): Promise<void> {
    this.connection = await connect(this.uri)
    this.channel = await this.connection.createChannel()
  }
}
