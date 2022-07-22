import { AppError } from '~config/errors/AppError'

export class QueueOneService {
  async handle (input: object) {
    if (!input) {
      throw new AppError('Input was not informed')
    }

    console.log('Queue One was called with input', input)
  }
}
