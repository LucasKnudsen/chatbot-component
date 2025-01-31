export type TranscriptChunk = {
  start: number
  end: number
  text: string
  speaker: string
}

export type TranscribeAudioResponse = {
  audio_file: string
  config: {
    whisper_model: string
    x_toggle: boolean
  }
  transcription: TranscriptChunk[]
}
