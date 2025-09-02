const requestLog = (req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url, req.headers?.origin, req.body)
  next()
}

export const useLogMiddleware = app => {
  app.use(requestLog)
}
