const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const region = process.env.REGION
const userPoolId = process.env.AUTH_FRAIAAUTH_USERPOOLID

const client = jwksClient({
  jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
})

type Identity = {
  sub: string
  iss: string
  client_id: string
  origin_jti: string
  event_id: string
  token_use: string
  scope: string
  auth_time: number
  exp: number
  iat: number
  jti: string
  username: string
}

const getSigningKey = (header, callback) => {
  client.getSigningKey(header.kid!, (err, key) => {
    if (err) {
      callback(err)
    } else {
      const signingKey = key.getPublicKey()
      callback(null, signingKey)
    }
  })
}

const authorizeToken = async (
  token: string,
  onSuccess: (identity: Identity) => Promise<boolean>
) => {
  if (!token) {
    throw new Error('MISSING_TOKEN')
  }

  const identity: Identity = await new Promise((resolve, reject) => {
    // Validate and decode the token
    jwt.verify(token, getSigningKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        console.log(decoded) // Decoded token
        resolve(decoded)
      }
    })
  })

  return await onSuccess(identity)
}

export { authorizeToken }
