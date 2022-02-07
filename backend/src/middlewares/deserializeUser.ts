//middleware to add the user to request object
import { get } from 'lodash' //makes little bit safe to access property that we dont know if exists or not
import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt.utils'

export const deserialzeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get access token from headers

  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  if (!accessToken) {
    return next()
  }

  const { decoded, expired } = verifyJwt(accessToken)
  console.log(decoded)

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  return next()
}
