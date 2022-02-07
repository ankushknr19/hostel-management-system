import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'
// when a request comes in, we're gonna provide
// a schema in the middleware and then its going
// to validate the request against that schema

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error: any) {
      return res.status(400).send(error.errors)
    }
  }

export default validate
