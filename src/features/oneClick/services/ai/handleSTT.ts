import { NEXT_API_ENDPOINTS } from '@/constants/api'

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
