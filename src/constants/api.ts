import awsConfig from '@/aws-exports'

const lastSegment = awsConfig.aws_cloud_logic_custom[0].endpoint.split('/').pop()

// const BASE_API_URL = 'http://localhost:3000/'
const BASE_API_URL = `https://${lastSegment}.di584hkzawdov.amplifyapp.com/`

export const NEXT_API_ENDPOINTS = {
  default: BASE_API_URL,
  textToSpeech: BASE_API_URL + 'api/tts',
  speechToText: BASE_API_URL + 'api/stt',
}
