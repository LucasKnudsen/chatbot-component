"use strict";
/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var client_s3_1 = require("@aws-sdk/client-s3");
var client_ssm_1 = require("@aws-sdk/client-ssm");
var openai_1 = require("openai");
var utils_1 = require("./utils");
var ssmClient = new client_ssm_1.SSMClient({ region: process.env.REGION });
var s3Client = new client_s3_1.S3Client({ region: process.env.REGION });
var dummyContext = "Lucas is in Thailand until the 25th of march. After that, he will fly to Denmark";
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var responseStatus, responseBody, body, context, _a, _b, evaluationResults, error_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                console.time('HANDLER');
                responseStatus = 200;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 7, 8, 9]);
                !event.isMock && console.log(event.body);
                body = JSON.parse(event.body || '');
                if (!event.isMock) return [3 /*break*/, 2];
                _a = dummyContext;
                return [3 /*break*/, 5];
            case 2:
                _b = ((_c = body.overrideConfig) === null || _c === void 0 ? void 0 : _c.context);
                if (_b) return [3 /*break*/, 4];
                return [4 /*yield*/, getKnowledgeContext(body.channelId)];
            case 3:
                _b = (_e.sent());
                _e.label = 4;
            case 4:
                _a = _b;
                _e.label = 5;
            case 5:
                context = _a;
                return [4 /*yield*/, evaluateAnswers(body.dataset, context, body.overrideConfig)];
            case 6:
                evaluationResults = _e.sent();
                responseBody = evaluationResults;
                return [3 /*break*/, 9];
            case 7:
                error_1 = _e.sent();
                console.error('DEFAULT ERROR', error_1);
                responseStatus = ((_d = error_1.response) === null || _d === void 0 ? void 0 : _d.status) || 500;
                responseBody = {
                    message: error_1.message,
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
var getKnowledgeContext = function (channelId) { return __awaiter(void 0, void 0, void 0, function () {
    var path, listObjectsCommand, listObjectsOutput, contextList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = "_/".concat(channelId);
                listObjectsCommand = new client_s3_1.ListObjectsV2Command({
                    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
                    Prefix: path
                });
                return [4 /*yield*/, s3Client.send(listObjectsCommand)];
            case 1:
                listObjectsOutput = _a.sent();
                if (listObjectsOutput.KeyCount === listObjectsOutput.MaxKeys) {
                    console.error('MaxKeys reached', listObjectsOutput.KeyCount, listObjectsOutput.MaxKeys);
                }
                if (!listObjectsOutput.Contents) {
                    throw new Error('We found no context to evaluate the question with.');
                }
                return [4 /*yield*/, Promise.all(listObjectsOutput.Contents.filter(function (obj) { return obj.Key.endsWith('raw.txt'); }).map(function (_a) {
                        var Key = _a.Key;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                                        var Body, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, s3Client.send(new client_s3_1.GetObjectCommand({
                                                        Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
                                                        Key: Key
                                                    }))];
                                                case 1:
                                                    Body = (_b.sent()).Body;
                                                    _a = resolve;
                                                    return [4 /*yield*/, Body.transformToString()];
                                                case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    }))];
            case 2:
                contextList = _a.sent();
                return [2 /*return*/, contextList.join('\n')];
        }
    });
}); };
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
var initiateOpenAI = function () { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSecret('fraia-open-ai-key-1')];
            case 1:
                apiKey = _a.sent();
                if (!apiKey)
                    throw new TypeError('OPENAI_API_KEY_NOT_FOUND');
                return [2 /*return*/, new openai_1["default"]({
                        organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
                        apiKey: apiKey
                    })];
        }
    });
}); };
var evaluateAnswers = function (dataset, context, overrideConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var openai, model, temperature, openaiResults, evaluationsList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initiateOpenAI()];
            case 1:
                openai = _a.sent();
                model = (overrideConfig === null || overrideConfig === void 0 ? void 0 : overrideConfig.model) || 'gpt-4';
                temperature = (overrideConfig === null || overrideConfig === void 0 ? void 0 : overrideConfig.temperature) || 0.3;
                return [4 /*yield*/, Promise.all(dataset.map(function (_a) {
                        var question = _a.question, answer = _a.answer;
                        return openai.chat.completions.create({
                            messages: [{ role: 'user', content: (0, utils_1.getGradingPrompt)({ question: question, answer: answer, context: context }) }],
                            tools: [{ type: 'function', "function": (0, utils_1.getGradingFunction)(4) }],
                            tool_choice: 'auto',
                            temperature: temperature,
                            model: model
                        });
                    }))];
            case 2:
                openaiResults = _a.sent();
                evaluationsList = openaiResults
                    .map(function (result, index) {
                    var _a;
                    try {
                        return JSON.parse((_a = result.choices[0].message.tool_calls) === null || _a === void 0 ? void 0 : _a[0]["function"].arguments);
                    }
                    catch (error) {
                        console.log('shit');
                        return {
                            evaluations: [],
                            error: 'OpenAI response was parsed incorrectly'
                        };
                    }
                })
                    .map(function (evaulationObj, index) {
                    console.log(evaulationObj.evaluations);
                    return __assign({ timestamp: dataset[index].timestamp }, evaulationObj);
                });
                return [2 /*return*/, evaluationsList];
        }
    });
}); };
