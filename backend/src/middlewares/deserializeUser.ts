//middleware to add the user to request object
//gets access token from headers, verifies it and puts the decoded data into res.locals

import { get } from 'lodash' //makes little bit safe to access property that we dont know if exists or not
import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt.utils'
import { reissueAccessToken } from '../controllers/session.controller'

export const deserialzeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get access token from headers
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  //get refresh token from headers
  const refreshToken = get(req, 'headers.x-refresh')

  if (!accessToken) {
    return next()
  }

  //verfiy the token
  const { decoded, expired } = verifyJwt(accessToken)

  if (decoded) {
    res.locals.user = decoded //decoded has data passed when signing jwt
    return next()
  }

  //access token expired and has refresh token
  if (expired && refreshToken) {
    //reissue access token
    const newAccessToken: string | boolean = await reissueAccessToken({
      refreshToken,
    })

    if (!newAccessToken) {
      return next()
    }

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }

    const { decoded } = verifyJwt(newAccessToken)

    res.locals.user = decoded
    return next()
  }
  return next()
}
