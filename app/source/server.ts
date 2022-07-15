import express from 'express'

import 'dotenv/config'

import router from '~src/routes'

const app = express()

app.use(express.json())
app.use(router)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
