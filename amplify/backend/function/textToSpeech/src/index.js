"use strict";
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
var openai_1 = require("openai");
var client_ssm_1 = require("@aws-sdk/client-ssm");
var ssmClient = new client_ssm_1.SSMClient({ region: process.env.REGION });
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var responseStatus, responseBody, body, apiKey, openai, audio, buffer, _a, _b, base64body, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.time('HANDLER');
                responseStatus = 200;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, 6, 7]);
                !event.isMock && console.log(event.body);
                body = JSON.parse(event.body || '');
                return [4 /*yield*/, getSecret('fraia-open-ai-key-1')];
            case 2:
                apiKey = _d.sent();
                if (!apiKey)
                    throw new TypeError('OPENAI_API_KEY_NOT_FOUND');
                openai = new openai_1["default"]({
                    organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
                    apiKey: apiKey
                });
                return [4 /*yield*/, openai.audio.speech.create({
                        model: 'tts-1',
                        voice: 'nova',
                        input: body.text
                    })
                    // if (event.isMock) {
                    //   const buffer = Buffer.from(await audio.arrayBuffer())
                    //   await writeFile('tmp/test.mp3', buffer)
                    // }
                ];
            case 3:
                audio = _d.sent();
                _b = (_a = Buffer).from;
                return [4 /*yield*/, audio.arrayBuffer()];
            case 4:
                buffer = _b.apply(_a, [_d.sent()]);
                base64body = buffer.toString('base64');
                responseBody = base64body;
                return [3 /*break*/, 7];
            case 5:
                error_1 = _d.sent();
                console.error('DEFAULT ERROR', error_1);
                responseStatus = ((_c = error_1.response) === null || _c === void 0 ? void 0 : _c.status) || 500;
                responseBody = {
                    message: error_1.message,
                    status: responseStatus,
                    type: error_1.type,
                    stack: error_1.stack
                };
                return [3 /*break*/, 7];
            case 6:
                console.timeEnd('HANDLER');
                return [2 /*return*/, {
                        statusCode: responseStatus,
                        body: responseBody,
                        isBase64Encoded: true,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*',
                            'Content-Type': 'audio/mp3'
                        }
                    }];
            case 7: return [2 /*return*/];
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
