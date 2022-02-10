import jwt from 'jsonwebtoken'

//function for signing jwt
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.jwtSecretKey!, {
    ...(options && options), //making sure that object is defined
  })
}
//function for verifying jwt
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.jwtSecretKey!)

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
