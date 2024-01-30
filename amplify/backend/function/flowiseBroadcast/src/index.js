"use strict";
/* Amplify Params - DO NOT EDIT
    API_DIGITALTWIN_GRAPHQLAPIENDPOINTOUTPUT
    API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
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
var mutation_1 = require("./mutation");
var publish2channel = /* GraphQL */ "\n  mutation Publish2channel($sessionId: String!, $data: AWSJSON!) {\n    publish2channel(sessionId: $sessionId, data: $data) {\n      sessionId\n      data\n      __typename\n    }\n  }\n";
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var isMock, responseStatus, responseBody, _a, sessionId, data, variables, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                isMock = event.isMock || false;
                isMock && console.log("EVENT: ".concat(event));
                responseStatus = 200;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, 4, 5]);
                _a = event.body, sessionId = _a.sessionId, data = _a.data;
                variables = {
                    sessionId: sessionId,
                    data: JSON.stringify(data)
                };
                return [4 /*yield*/, (0, mutation_1.graphqlMutation)({ query: publish2channel, variables: variables })];
            case 2:
                responseBody = _b.sent();
                if (responseBody.errors)
                    responseStatus = 400;
                return [3 /*break*/, 5];
            case 3:
                error_1 = _b.sent();
                console.error('DETFAULT ERROR', error_1);
                responseStatus = 400;
                responseBody = {
                    message: error_1.message,
                    status: responseStatus,
                    type: error_1.type,
                    stack: error_1.stack
                };
                return [3 /*break*/, 5];
            case 4:
                console.log('RESPONSE BODY: ', responseBody);
                return [2 /*return*/, {
                        statusCode: responseStatus,
                        body: JSON.stringify(responseBody),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*'
                        }
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
