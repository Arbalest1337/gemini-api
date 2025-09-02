import 'dotenv/config'
import express from 'express'
import { success, failed } from './src/utils/index.js'
import { useLogMiddleware } from './src/middleware/log.js'
import { useCorsMiddleware } from './src/middleware/cors.js'
import { useErrorHandle } from './src/middleware/error.js'
import { generateImage } from './src/module/gemini.js'

const app = express()
app.use(express.json())

useLogMiddleware(app)
useCorsMiddleware(app, { allowAll: true })

app.post('/generate-image', async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body
    if (!prompt) throw new Error('Prompt required!')
    const result = await generateImage({ prompt, imageUrl })
    res.send(success(result))
  } catch (err) {
    res.send(failed(err))
  }
})

useErrorHandle(app)

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  console.log(`app listening on port ${port}, you can test on ${port}/test`)
})
