export const success = (data = {}) => {
  return {
    code: 200,
    success: true,
    message: 'success',
    data
  }
}

export const failed = (err = {}) => {
  console.error(err)
  return {
    code: 500,
    success: false,
    message: err.message ?? 'failed',
    data: err
  }
}

export const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout ?? 0))
