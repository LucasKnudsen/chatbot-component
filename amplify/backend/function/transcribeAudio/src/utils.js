"use strict";
/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
exports.__esModule = true;
exports.splitAudioIntoChunk = exports.getAudioDuration = exports.convertWebmToMp3 = void 0;
var ffmpeg = require('./ffmpeg.js');
function getAudioDuration(filePath) {
    return new Promise(function (resolve, reject) {
        ffmpeg.ffprobe(filePath, function (err, data) {
            if (err) {
                console.error('Error occurred while getting audio duration', err);
                reject(err);
            }
            else {
                console.log('Successfully probes audio');
                resolve(data.format);
            }
        });
    });
}
exports.getAudioDuration = getAudioDuration;
function convertWebmToMp3(inputFilePath, outputFilePath) {
    return new Promise(function (resolve, reject) {
        ffmpeg(inputFilePath)
            .outputFormat('mp3')
            .output(outputFilePath)
            .on('end', function () {
            console.log('Conversion finished successfully');
            resolve(outputFilePath);
        })
            .on('error', function (err) {
            console.log('Error occurred: ' + err.message);
            reject(err);
        })
            .run();
    });
}
exports.convertWebmToMp3 = convertWebmToMp3;
function splitAudioIntoChunk(inputFilePath, startTime, duration, index) {
    var outputFilePath = "./tmp/chunk-".concat(Number(index) + 1, ".mp3"); // Adjust output format as needed
    return new Promise(function (resolve, reject) {
        ffmpeg(inputFilePath)
            .setStartTime(startTime) // Start time for the split
            .setDuration(duration) // Duration of the split
            .output(outputFilePath) // Output file path
            .on('end', function () {
            // Event listener for the end of the process
            console.log("Splitting ".concat(index + 1, " finished successfully"));
            resolve('');
        })
            .on('error', function (err) {
            // Error handling
            console.log('Error occurred: ' + err.message);
            reject(err);
        })
            .run(); // Execute the command
    });
}
exports.splitAudioIntoChunk = splitAudioIntoChunk;
