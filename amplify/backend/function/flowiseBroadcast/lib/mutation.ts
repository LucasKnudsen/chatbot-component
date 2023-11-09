export const publish2channel = /* GraphQL */ `
  mutation Publish2channel($sessionId: String!, $data: AWSJSON!) {
    publish2channel(sessionId: $sessionId, data: $data) {
      sessionId
      data
      __typename
    }
  }
`
