import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as pdf from 'pdf-parse'

const s3Client = new S3Client({ region: process.env.REGION })

const parsePDF = async (pdfPath: string): Promise<string> => {
  const input = {
    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
    Key: pdfPath,
  }

  const { Body } = await s3Client.send(new GetObjectCommand(input))

  const data = await pdf(await Body.transformToByteArray())

  // // Split the text into half
  // const split = Math.floor(data.text.length / 100)
  // const section = data.text.substr(0, split)

  return data.text
}

export { parsePDF }
