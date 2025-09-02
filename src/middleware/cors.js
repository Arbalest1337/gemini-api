import cors from 'cors'

export const useCorsMiddleware = (app, options) => {
  const { whiteList = [], allowAll = false } = options ?? {}

  const corsOptions = {
    origin: (origin, callback) => {
      allowAll || whiteList.some(item => origin?.includes(item))
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(cors(corsOptions))
}
