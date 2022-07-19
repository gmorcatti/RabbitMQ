import { Request, Response, NextFunction } from 'express'

import { AppError } from './AppError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      message: err.message,
    })
  }

  return res.status(500).send({
    message: 'Internal Server Error',
    details: err.message,
  })
}
