/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const ffmpeg = require('./ffmpeg.js')

function getAudioDuration(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, data) => {
      if (err) {
        console.error('Error occurred while getting audio duration', err)
        reject(err)
      } else {
        console.log('Successfully probes audio')
        resolve(data.format)
      }
    })
  })
}

function convertWebmToMp3(inputFilePath: string, outputFilePath: string) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .outputFormat('mp3')
      .output(outputFilePath)
      .on('end', function () {
        console.log('Conversion finished successfully')
        resolve(outputFilePath)
      })
      .on('error', function (err) {
        console.log('Error occurred: ' + err.message)
        reject(err)
      })
      .run()
  })
}

function splitAudioIntoChunk(
  inputFilePath: string,
  startTime: number,
  duration: number,
  index: number
): any {
  const outputFilePath = `./tmp/chunk-${Number(index) + 1}.mp3` // Adjust output format as needed

  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .setStartTime(startTime) // Start time for the split
      .setDuration(duration) // Duration of the split
      .output(outputFilePath) // Output file path
      .on('end', function () {
        // Event listener for the end of the process
        console.log(`Splitting ${index + 1} finished successfully`)
        resolve('')
      })
      .on('error', function (err) {
        // Error handling
        console.log('Error occurred: ' + err.message)
        reject(err)
      })
      .run() // Execute the command
  })
}

export { convertWebmToMp3, getAudioDuration, splitAudioIntoChunk }
