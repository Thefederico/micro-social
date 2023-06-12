export class Response {
  static success (_req, res, data, status = 200) {
    res.status(status).json({
      error: '',
      data
    })
  }

  static error (_req, res, error, status = 500, details) {
    res.status(status).json({
      error,
      data: ''
    })
  }
}
