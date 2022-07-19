import 'dotenv/config'
import 'express-async-errors'

import express from 'express'

import { ErrorHandler } from '~config/errors/ErrorHandler'
import router from '~src/routes'

const app = express()

app.use(express.json())
app.use(router)
app.use(ErrorHandler)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
