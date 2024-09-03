import { logErrorToServer } from '@/utils'
import axios from 'axios'

const HEYGEN_API_KEY = import.meta.env.VITE_HEYGEN_TOKEN

export async function fetchAccessToken() {
  try {
    const url = 'https://api.heygen.com/v1/streaming.create_token'
    const response = await axios(url, {
      method: 'POST',
      headers: {
        'x-api-key': HEYGEN_API_KEY,
      },
    })

    return response.data?.data?.token || ''
  } catch (error) {
    logErrorToServer({
      error,
      context: {
        description: '',
      },
    })
    console.error('Error fetching access token:', error)
    return ''
  }
}

// async function closeSession() {
//   try {
//     const url = `https://api.heygen.com/v1/streaming.stop`
//     await axios(url, {
//       method: 'POST',
//       params: { sessionId: data()?.sessionId },
//       headers: {
//         'x-api-key': token,
//       },
//     })
//   } catch (err) {
//     console.error('Error closing session:', err)
//   }
// }
// async function updateToken() {
//   const newToken = await fetchAccessToken()
//   console.log('Updating Access Token:', newToken) // Log token for debugging
//   avatar = new StreamingAvatarApi(new Configuration({ accessToken: newToken }))

//   const startTalkCallback = (e: any) => {
//     console.log('Avatar started talking', e)
//   }

//   const stopTalkCallback = (e: any) => {
//     console.log('Avatar stopped talking', e)
//   }

//   console.log('Adding event handlers:', avatar)
//   avatar.addEventHandler('avatar_start_talking', startTalkCallback)
//   avatar.addEventHandler('avatar_stop_talking', stopTalkCallback)

//   setInitialized(true)
// }
