import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { writeFile } from 'fs/promises'

const s3Client = new S3Client({ region: process.env.REGION })

const writeS3Object = async (s3Key: string, path: string) => {
  const input = {
    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
    Key: s3Key,
  }

  const { Body } = await s3Client.send(new GetObjectCommand(input))

  console.log('Successfully retrieved file from S3')

  const fileBuffer = await new Response(Body as ReadableStream).arrayBuffer()

  await writeFile(path, Buffer.from(fileBuffer))

  console.log('Successfully writes raw file to temp')
}

const saveTextToS3 = async (s3Key: string, text: string) => {
  const input: PutObjectCommandInput = {
    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
    Key: s3Key,
    Body: text,
  }

  await s3Client.send(new PutObjectCommand(input))

  return s3Key
}

const createChannelDocumentRecord = async (input: {
  s3KeyRaw: string
  s3KeyTranscription: string
}) => {
  const params = {
    TableName: '',
  }
}

export { createChannelDocumentRecord, saveTextToS3, writeS3Object }
