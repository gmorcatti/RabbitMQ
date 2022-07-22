import { AppError } from '~config/errors/AppError'

export class QueueTwoService {
  async handle (input: object) {
    if (!input) {
      throw new AppError('Input was not informed')
    }

    console.log('Queue Two was called with input', input)
  }
}
