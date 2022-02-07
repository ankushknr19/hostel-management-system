import config from 'config'
import jwt from 'jsonwebtoken'

// const publicKey = config.get<string>('publicKey')
// const privateKey = config.get<string>('privateKey')
const jwtSecretKey = config.get<string>('jwtSecretKey')

//function for signing jwt
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(
    object,
    jwtSecretKey
    {
    ...(options && options), //making sure that object is defined
    // algorithm: 'RS256',
    }
  )
}

//function for verifying jwt
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, jwtSecretKey)

    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    }
  }
}
