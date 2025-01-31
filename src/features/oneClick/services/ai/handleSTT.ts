import { NEXT_API_ENDPOINTS } from '@/constants/api'
import { API } from 'aws-amplify'

export const quickTranscribe = async (audio: Blob) => {
  const base64Audio = await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(audio)
    reader.onloadend = () => {
      const base64data = reader.result?.toString() || ''
      resolve(base64data.split(',')[1])
    }
  })

  const botAudio = await API.post('digitaltwinRest', '/ai/stt', {
    body: {
      base64Audio,
      fileType: audio.type,
    },
  })

  return `${botAudio}`
}

export const handleTranscription = async (audioBlob: Blob) => {
  if (!audioBlob) {
    throw new Error('No audio blob found')
  }

  let transcribedText = ''
  const audioFile = new File([audioBlob], `audio.${audioBlob.type.split('/')[1]}`, {
    type: audioBlob.type,
  })

  const formData = new FormData()
  formData.append('file', audioFile)

  const transcriptionResponse = await fetch(NEXT_API_ENDPOINTS.speechToText, {
    method: 'POST',
    body: formData,
  })

  transcribedText = (await transcriptionResponse.json()).data.transcription
  // }

  return transcribedText
}
