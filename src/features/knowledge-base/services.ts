import { ChannelDocument, IndexKnowledgeMutation, mutations } from '@/graphql'
import { randomUUID } from '@/utils'
import { GraphQLQuery } from '@aws-amplify/api'
import { API, Auth, Storage } from 'aws-amplify'
import axios from 'axios'
import { botStore } from '../bot'
import { TranscribeAudioResponse, TranscriptChunk } from './types'

export const transcribeAudio = async (file: File) => {
  // TODO: Implement transcription in a middleware
  const formData = new FormData()
  const config = {
    whisper_model: 'large',
    x_toggle: true,
  }
  const apiKey = 'hL9cnMRZQr6vC+/6y2AXSWir4xCflOjZcnqR4HdiHXA=' // Sorry mom

  if (!apiKey) {
    throw new Error('No API key found')
  }

  formData.append('audio_file', file)
  formData.append('config', JSON.stringify(config))

  const data = await axios.post<TranscribeAudioResponse>(
    'https://lb_transcription.softdesign.dk/audio',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  )

  return data.data
}

export const mergeTranscriptBySpeaker = (transcription: TranscriptChunk[]): TranscriptChunk[] => {
  const mergedTranscriptBySpeaker: TranscriptChunk[] = []

  transcription.forEach((chunk, index) => {
    // Check if it's the first chunk or if the speaker is different from the previous one
    if (
      index === 0 ||
      chunk.speaker !== mergedTranscriptBySpeaker[mergedTranscriptBySpeaker.length - 1].speaker
    ) {
      mergedTranscriptBySpeaker.push({ ...chunk })
    } else {
      // Get the last item in the merged array
      const lastItem = mergedTranscriptBySpeaker[mergedTranscriptBySpeaker.length - 1]
      // Update its text and end time
      lastItem.text += ` ${chunk.text}` // Concatenate text with a space
      lastItem.end = chunk.end
    }
  })

  return mergedTranscriptBySpeaker
}

type IndexDocumentInput = {
  originalFile: File
  parsedTextFile?: File
  documentParams: DocumentParams
  channelIdOverride?: string
}

type DocumentParams = Pick<
  ChannelDocument,
  'title' | 'documentType' | 'includeInLibrary' | 'description' | 'source'
>

export const indexDocument = async ({
  originalFile,
  parsedTextFile,
  documentParams,
  channelIdOverride,
}: IndexDocumentInput): Promise<ChannelDocument> => {
  const channelId = channelIdOverride || botStore.activeChannel?.id

  if (!channelId) {
    throw new Error('No valid channel selected')
  }

  const newDocumentId = randomUUID()

  const folderPath = `${channelId}/${newDocumentId}`

  const [s3KeyOriginal, s3KeyRawText] = await handleDocumentStorageOnIndex({
    originalFile,
    parsedTextFile,
    folderPath,
  })

  const user = await Auth.currentAuthenticatedUser()

  const input: Partial<ChannelDocument> = {
    channelId,
    id: newDocumentId,

    s3KeyOriginal,
    s3KeyRawText,
    fileName: originalFile.name,
    fileSize: originalFile.size,
    fileType: originalFile.type,
    fileSuffix: originalFile.name.split('.')[1],
    uploadedBy: user.username,
    ...documentParams,
  }

  const result = await API.graphql<GraphQLQuery<IndexKnowledgeMutation>>({
    query: mutations.indexKnowledge,
    variables: { input: JSON.stringify(input) },
  })

  const newDocument = result.data?.indexKnowledge

  if (!newDocument) {
    throw new Error('Knowledge indexing successful, but could not retrieve the new document.')
  }

  return newDocument
}

const handleDocumentStorageOnIndex = async ({
  originalFile,
  parsedTextFile,
  folderPath,
}: {
  originalFile: File
  parsedTextFile?: File
  folderPath: string
}) => {
  let s3KeyOriginal = ''
  let s3KeyRawText = ''
  const fileSuffix = originalFile.name.split('.')[1]

  const rawTextPath = `${folderPath}/raw.txt`
  const originalPath = `${folderPath}/original.${fileSuffix}`

  switch (true) {
    case originalFile.type === 'text/plain':
      // If the original file is a text file, we upload it directly to the rawTextPath
      ;[s3KeyOriginal, s3KeyRawText] = await Promise.all([
        uploadToS3(originalFile, originalPath),
        uploadToS3(originalFile, rawTextPath),
      ])
      break

    case originalFile.type === 'application/pdf':
      // PDFs are parsed by the backend, so we only upload the original file to S3
      // Then we manually insert the global prefix '_/' to the rawTextPath (because this is automatically set only by the Client uploads to S3)
      s3KeyRawText = '_/' + rawTextPath
      s3KeyOriginal = await uploadToS3(originalFile, originalPath)
      break

    case parsedTextFile != null:
      // If a parsedTextFile is provided, we upload both the original and the parsed text to S3
      ;[s3KeyOriginal, s3KeyRawText] = await Promise.all([
        uploadToS3(originalFile, originalPath),
        uploadToS3(parsedTextFile!, rawTextPath),
      ])
      break

    default:
      throw new Error(
        'This is outside current functionality. Please provide a parsedTextFile for non-PDF files.'
      )
  }

  return [s3KeyOriginal, s3KeyRawText]
}

export const uploadToS3 = async (file: File, path: string, prefix: string = '_/') => {
  const { key } = await Storage.put(path, file, {
    contentType: file.type,
  })

  return `${prefix}${key}`
}
