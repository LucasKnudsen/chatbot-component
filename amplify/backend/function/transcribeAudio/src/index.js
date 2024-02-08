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
// @ts-ignore
var openai_1 = require("openai");
// @ts-ignore
var client_s3_1 = require("@aws-sdk/client-s3");
// @ts-ignore
var client_ssm_1 = require("@aws-sdk/client-ssm");
var ssmClient = new client_ssm_1.SSMClient({ region: process.env.REGION });
var s3Client = new client_s3_1.S3Client({ region: process.env.REGION });
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var responseStatus, responseBody, _a, s3Key, type, secretName, apiKey, openai, input, Body, file, _b, _c, _d, transcription, error_1;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                console.time('HANDLER');
                responseStatus = 200;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 7, 8, 9]);
                !event.isMock && console.log("EVENT BODY: ".concat(event.body));
                _a = JSON.parse(event.body || ''), s3Key = _a.s3Key, type = _a.type;
                secretName = process.env.openai_key;
                if (!secretName)
                    throw new TypeError('OPENAI_API_SECRET_NAME_NOT_FOUND');
                return [4 /*yield*/, getSecret(secretName)];
            case 2:
                apiKey = _f.sent();
                console.log('API KEY');
                openai = new openai_1["default"]({
                    organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
                    apiKey: apiKey
                });
                input = {
                    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
                    Key: s3Key
                };
                return [4 /*yield*/, s3Client.send(new client_s3_1.GetObjectCommand(input))];
            case 3:
                Body = (_f.sent()).Body;
                console.log('S3');
                console.time('TRANSCRIPTION');
                _b = openai_1.toFile;
                _d = (_c = Buffer).from;
                return [4 /*yield*/, Body.transformToString('base64')];
            case 4: return [4 /*yield*/, _b.apply(void 0, [_d.apply(_c, [_f.sent(), 'base64']),
                    s3Key,
                    {
                        type: type
                    }])];
            case 5:
                file = _f.sent();
                return [4 /*yield*/, openai.audio.transcriptions.create({
                        file: file,
                        model: 'whisper-1'
                    })];
            case 6:
                transcription = _f.sent();
                console.timeEnd('TRANSCRIPTION');
                console.log(transcription);
                responseBody = transcription.text;
                return [3 /*break*/, 9];
            case 7:
                error_1 = _f.sent();
                console.error('DEFAULT ERROR', error_1);
                responseStatus = ((_e = error_1.response) === null || _e === void 0 ? void 0 : _e.status) || 500;
                responseBody = {
                    message: error_1.message || error_1,
                    status: responseStatus,
                    type: error_1.type,
                    stack: error_1.stack
                };
                return [3 /*break*/, 9];
            case 8:
                console.timeEnd('HANDLER');
                return [2 /*return*/, {
                        statusCode: responseStatus,
                        body: JSON.stringify(responseBody),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*'
                        }
                    }];
            case 9: return [2 /*return*/];
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
