const ffmpeg = require('fluent-ffmpeg')
const pathToFfmpeg = require('ffmpeg-static')
const ffprobePath = require('ffprobe-static').path

ffmpeg.setFfmpegPath(pathToFfmpeg)
ffmpeg.setFfprobePath(ffprobePath)
// console.log(ffmpegInstaller.path, ffmpegInstaller.version);

module.exports = ffmpeg

// Dependencies
//    "@ffmpeg-installer/ffmpeg": "^1.0.13",
//     "ffmpeg-static": "^5.2.0",
//     "ffprobe-static": "^3.1.0",
//     "fluent-ffmpeg": "^2.1.2"
