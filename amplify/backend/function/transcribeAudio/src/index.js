"use strict";
/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = void 0;
var client_ssm_1 = require("@aws-sdk/client-ssm");
var fs_1 = require("fs");
var openai_1 = require("openai");
var storage_1 = require("./storage");
var utils_1 = require("./utils");
var ssmClient = new client_ssm_1.SSMClient({ region: process.env.REGION });
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var responseStatus, responseBody, _a, s3Key, type, channelId, fileName, tempFilePath, path, chunkDurations, audioFormat, pathToConvertedFile, duration, loopIndex, i, secretName, apiKey, openai, fullTranscription_1, transcriptionPromises, i, transcriptions, s3TranscriptionKey, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.time('HANDLER');
                responseStatus = 200;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 15, 16, 17]);
                !event.isMock && console.log("EVENT BODY: ".concat(event.body));
                _a = JSON.parse(event.body || ''), s3Key = _a.s3Key, type = _a.type, channelId = _a.channelId, fileName = _a.fileName;
                tempFilePath = "./tmp/file-to-transcribe.mp3";
                return [4 /*yield*/, (0, storage_1.writeS3Object)(s3Key, tempFilePath)];
            case 2:
                _c.sent();
                return [2 /*return*/];
            case 3:
                audioFormat = _c.sent();
                if (!audioFormat.format_name.includes('webm')) return [3 /*break*/, 6];
                pathToConvertedFile = "./tmp/formatted.mp3";
                return [4 /*yield*/, (0, utils_1.convertWebmToMp3)(path, pathToConvertedFile)];
            case 4:
                _c.sent();
                path = pathToConvertedFile;
                return [4 /*yield*/, (0, utils_1.getAudioDuration)(pathToConvertedFile)];
            case 5:
                // Gets audio duration of converted file
                audioFormat = _c.sent();
                _c.label = 6;
            case 6:
                duration = audioFormat.duration;
                loopIndex = 0;
                i = 0;
                _c.label = 7;
            case 7:
                if (!(i < duration)) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, utils_1.splitAudioIntoChunk)(path, i, chunkDurations, loopIndex)];
            case 8:
                _c.sent();
                loopIndex++;
                _c.label = 9;
            case 9:
                i += chunkDurations;
                return [3 /*break*/, 7];
            case 10:
                console.log('Successfully splits audio');
                secretName = process.env.openai_key;
                if (!secretName)
                    throw new TypeError('OPENAI_API_SECRET_NAME_NOT_FOUND');
                return [4 /*yield*/, getSecret(secretName)];
            case 11:
                apiKey = _c.sent();
                if (!apiKey)
                    throw new TypeError('OPENAI_API_KEY_NOT_FOUND');
                openai = new openai_1["default"]({
                    organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
                    apiKey: apiKey
                });
                console.log('Successfully initiated OpenAI');
                fullTranscription_1 = '';
                transcriptionPromises = [];
                // Builds promises to be fired asynchronously
                for (i = 0; i < loopIndex; i++) {
                    console.log("Initiating transcription for file ".concat(i + 1, "."));
                    transcriptionPromises.push(openai.audio.transcriptions.create({
                        file: (0, fs_1.createReadStream)("./tmp/chunk-".concat(i + 1, ".mp3")),
                        model: 'whisper-1'
                    }));
                }
                return [4 /*yield*/, Promise.all(transcriptionPromises)];
            case 12:
                transcriptions = _c.sent();
                transcriptions.forEach(function (t) {
                    fullTranscription_1 += t.text;
                });
                return [4 /*yield*/, (0, storage_1.saveTextToS3)("_/".concat(channelId, "/transcriptions/").concat(fileName, "-").concat(new Date().toISOString()), fullTranscription_1)
                    // Saves a record in DB to reference to the different documents.
                ];
            case 13:
                s3TranscriptionKey = _c.sent();
                // Saves a record in DB to reference to the different documents.
                return [4 /*yield*/, (0, storage_1.createChannelDocumentRecord)({
                        s3KeyRaw: s3Key,
                        s3KeyTranscription: s3TranscriptionKey
                    })];
            case 14:
                // Saves a record in DB to reference to the different documents.
                _c.sent();
                responseBody = fullTranscription_1;
                return [3 /*break*/, 17];
            case 15:
                error_1 = _c.sent();
                console.error('DEFAULT ERROR', error_1);
                responseStatus = ((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.status) || 500;
                responseBody = {
                    message: error_1.message || error_1,
                    status: responseStatus,
                    type: error_1.type,
                    stack: error_1.stack
                };
                return [3 /*break*/, 17];
            case 16:
                console.timeEnd('HANDLER');
                return [2 /*return*/, {
                        statusCode: responseStatus,
                        body: JSON.stringify(responseBody),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*'
                        }
                    }];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var getSecret = function (secretName) { return __awaiter(void 0, void 0, void 0, function () {
    var command, Parameter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new client_ssm_1.GetParameterCommand({ Name: secretName, WithDecryption: true });
                return [4 /*yield*/, ssmClient.send(command)];
            case 1:
                Parameter = (_a.sent()).Parameter;
                return [2 /*return*/, Parameter.Value];
        }
    });
}); };
