const crypto = require('@aws-crypto/sha256-js')
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import { HttpRequest } from '@aws-sdk/protocol-http'
import { SignatureV4 } from '@aws-sdk/signature-v4'
import { default as fetch, Request } from 'node-fetch'

const { Sha256 } = crypto
const GRAPHQL_ENDPOINT = process.env.API_DIGITALTWIN_GRAPHQLAPIENDPOINTOUTPUT
const AWS_REGION = process.env.REGION

export const graphqlMutation = async (body: {
  query: string
  variables: any
  authMode?: string
}) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT)

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256,
  })

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify(body),
    path: endpoint.pathname,
  })

  const signed = await signer.sign(requestToBeSigned)
  const request = new Request(endpoint, signed)

  return (await fetch(request)).json()
}
