const ffmpeg = require('fluent-ffmpeg')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const tempFilePath = `./temp/test.webm`

  const generatedFiles = await splitAudioIntoChunks(tempFilePath, 5)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(generatedFiles),
  }
}

async function splitAudioIntoChunks(filePath, segmentDuration = 600) {
  return new Promise((resolve, reject) => {
    const outputDir = '/tmp' // Ensure this directory exists or is writable in your environment
    const outputFilePattern = `${outputDir}/output-%03d.mp3` // Adjust output format as needed

    ffmpeg(filePath)
      .output(outputFilePattern)
      .format('mp3')
      .audioCodec('libmp3lame') // Use an appropriate codec for your needs
      .setStartTime(0) // Start from the beginning
      .outputOptions([
        `-f segment`, // Specify segment format
        `-segment_time ${segmentDuration}`, // Segment duration in seconds
      ])
      .on('end', () => {
        console.log('Audio has been split successfully')
        // List or find the generated files and return their paths
        // This is a placeholder for the actual file listing logic
        const generatedFiles = [] // Populate this array with the paths of the generated segments
        resolve(generatedFiles)
      })
      .on('error', (err) => {
        console.error('An error occurred:', err.message)
        reject(err)
      })
      .run()
  })
}
