//used in routes where user is required

import { Request, Response, NextFunction } from 'express'

export const requireUser = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user
  //in deserialzeUser, we put the user in the response object because they had a valid token

  if (!user) {
    return res.status(401).send('unauthorized, invalid token') //forbidden
  }

  return next()
}
