import { failed } from '../utils/index.js'

export const useErrorHandle = app => {
  app.use((err, req, res, next) => {
    res.send(failed(err))
  })
}
