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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var axios_1 = require("axios");
// @ts-ignore
var client_ssm_1 = require("@aws-sdk/client-ssm");
// @ts-ignore
var openai_1 = require("openai");
// @ts-ignore
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
// @ts-ignore
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// @ts-ignore
var client_lambda_1 = require("@aws-sdk/client-lambda");
var ssmClient = new client_ssm_1.SSMClient({ region: process.env.REGION });
var client = new client_lambda_1.LambdaClient({ region: process.env.REGION });
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var responseStatus, responseBody, body, answer, _a, params, command, _b, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.time('HANDLER');
                responseStatus = 200;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 10, 11, 12]);
                !event.isMock && console.log("EVENT BODY: ".concat(event.body));
                body = JSON.parse(event.body);
                answer = { text: '', sourceDocuments: [] };
                _a = body.promptCode;
                switch (_a) {
                    case 'question': return [3 /*break*/, 2];
                    case 'suggestedPrompts': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 2: return [4 /*yield*/, handleFlowiseRequest(body)];
            case 3:
                answer = _d.sent();
                params = {
                    body: {
                        sessionId: body.chatId,
                        data: answer,
                    },
                };
                command = new client_lambda_1.InvokeCommand({
                    FunctionName: process.env.FUNCTION_FLOWISEBROADCAST_NAME,
                    Payload: JSON.stringify(params),
                });
                return [4 /*yield*/, client.send(command)];
            case 4:
                _d.sent();
                return [3 /*break*/, 9];
            case 5:
                _b = answer;
                return [4 /*yield*/, handleSuggestedPrompts(body, event.isMock)];
            case 6:
                _b.text = _d.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, handleFlowiseRequest(body)];
            case 8:
                answer = _d.sent();
                return [3 /*break*/, 9];
            case 9:
                console.log("ANSWER:", {
                    text: answer.text,
                    amountOfSourceDocuments: answer.sourceDocuments.length,
                });
                console.timeEnd('HANDLER');
                responseBody = answer;
                return [3 /*break*/, 12];
            case 10:
                error_1 = _d.sent();
                console.error('DEFAULT ERROR', error_1);
                console.timeEnd('HANDLER');
                responseStatus = ((_c = error_1.response) === null || _c === void 0 ? void 0 : _c.status) || 500;
                responseBody = {
                    message: error_1.message,
                    status: responseStatus,
                    type: error_1.type,
                    stack: error_1.stack,
                };
                return [3 /*break*/, 12];
            case 11: return [2 /*return*/, {
                    statusCode: responseStatus,
                    body: JSON.stringify(responseBody),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                }];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var getChannel = function (channelId) { return __awaiter(void 0, void 0, void 0, function () {
    var command, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!channelId)
                    throw new TypeError('MISSING_CHANNEL_ID');
                command = new lib_dynamodb_1.GetCommand({
                    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
                    Key: {
                        id: channelId,
                    },
                });
                return [4 /*yield*/, ddbDocClient.send(command)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.Item];
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
var handleFlowiseRequest = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var channelId, chatId, socketIOClientId, question, _a, channel, apiKey, endpoint, data, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.time('GET_CONFIG');
                channelId = body.channelId, chatId = body.chatId, socketIOClientId = body.socketIOClientId, question = body.question;
                return [4 /*yield*/, Promise.all([
                        getChannel(channelId),
                        getSecret("flowiseKey_".concat(channelId)),
                    ])];
            case 1:
                _a = _b.sent(), channel = _a[0], apiKey = _a[1];
                if (!channel)
                    throw new TypeError('CHANNEL_NOT_FOUND');
                if (!apiKey)
                    throw new TypeError('FLOWISE_API_KEY_NOT_FOUND');
                endpoint = "".concat(channel.apiHost, "/api/v1/prediction/").concat(channel.chatflowId);
                data = {
                    question: question,
                    overrideConfig: {
                        sessionId: {
                            RedisBackedChatMemory_1: chatId,
                        },
                    },
                    socketIOClientId: socketIOClientId,
                };
                console.timeEnd('GET_CONFIG');
                return [4 /*yield*/, axios_1.default.post(endpoint, data, {
                        headers: {
                            Authorization: apiKey,
                        },
                    })];
            case 2:
                result = _b.sent();
                return [2 /*return*/, result.data];
        }
    });
}); };
var initiateOpenAI = function () { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSecret(process.env.openai_key)];
            case 1:
                apiKey = _a.sent();
                if (!apiKey)
                    throw new TypeError('OPENAI_API_KEY_NOT_FOUND');
                return [2 /*return*/, new openai_1.default({
                        organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
                        apiKey: apiKey,
                    })];
        }
    });
}); };
var handleSuggestedPrompts = function (body, isMock) { return __awaiter(void 0, void 0, void 0, function () {
    var openai, previousQuestions, language, prompt, chatCompletion, textObj, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initiateOpenAI()];
            case 1:
                openai = _a.sent();
                previousQuestions = body.previousQuestions, language = body.language;
                language = language || 'en';
                previousQuestions = isMock
                    ? [
                        'Question 1: What is your chatbot about?',
                        'Question 2: How to buy the chatbot?',
                        'Question 3: What benefits can Soft Designs chatbot provide for my business?',
                    ]
                    : previousQuestions;
                // Validate that the previous questions are in the correct format
                if (!Array.isArray(previousQuestions)) {
                    console.error('PROMPTS ERROR', 'TypeError: PREVIOUS_QUESTIONS_NOT_ARRAY');
                    return [2 /*return*/, { text: '' }];
                }
                prompt = "Help me formulate two short concise follow up questions that would encourage the user to proceed with this conversation. They should be non-repetitive and based on the questions asked so far: \"".concat(previousQuestions.join(', '), "\".    \n      Give me the list of questions in a JSON list. You MUST understand and use the following language code as the language for the questions: \"").concat(language, "\". Do not say anything else, ONLY send me back a JSON list. Response example: { \"questions\": [\"What is...\", \"Tell me more about ...\"] }. \n      ");
                return [4 /*yield*/, openai.chat.completions.create({
                        messages: [{ role: 'user', content: prompt }],
                        model: 'gpt-3.5-turbo',
                    })];
            case 2:
                chatCompletion = _a.sent();
                textObj = chatCompletion.choices[0].message.content;
                try {
                    text = JSON.parse(textObj).questions;
                    return [2 /*return*/, text];
                }
                catch (error) {
                    console.error('ERROR PARSING OPENAI RESPONSE: ', error);
                    return [2 /*return*/, ''];
                }
                return [2 /*return*/];
        }
    });
}); };
