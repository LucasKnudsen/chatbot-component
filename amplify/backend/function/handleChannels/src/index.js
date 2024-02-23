"use strict";
/* Amplify Params - DO NOT EDIT
    API_DIGITALTWIN_CHANNELTABLE_ARN
    API_DIGITALTWIN_CHANNELTABLE_NAME
    API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
    API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
    API_DIGITALTWIN_CHATSPACETABLE_ARN
    API_DIGITALTWIN_CHATSPACETABLE_NAME
    API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
    API_DIGITALTWIN_ORGANIZATIONTABLE_ARN
    API_DIGITALTWIN_ORGANIZATIONTABLE_NAME
    API_DIGITALTWIN_USERTABLE_ARN
    API_DIGITALTWIN_USERTABLE_NAME
    AUTH_FRAIAAUTH_USERPOOLID
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
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var authorizers_1 = require("./authorizers");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuthorized, _a, isMock, input_1, _b, _c, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.time('HANDLER');
                isAuthorized = false;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 9, , 10]);
                _a = event.arguments, isMock = _a.isMock, input_1 = _a.input;
                !isMock && console.log("EVENT", event);
                !isMock && console.log("EVENT", event.arguments.input);
                _b = input_1.flow;
                switch (_b) {
                    case 'UPDATE': return [3 /*break*/, 2];
                }
                return [3 /*break*/, 7];
            case 2:
                if (!isMock) return [3 /*break*/, 3];
                _c = true;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, authorizeUpdateAccess(identity, input_1.data.id)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })];
            case 4:
                _c = _d.sent();
                _d.label = 5;
            case 5:
                isAuthorized = _c;
                if (!isAuthorized) {
                    throw new Error('Unauthorized to update channel');
                }
                return [4 /*yield*/, updateChannel(input_1.data)];
            case 6: return [2 /*return*/, _d.sent()];
            case 7: return [3 /*break*/, 8];
            case 8:
                console.timeEnd('HANDLER');
                return [3 /*break*/, 10];
            case 9:
                error_1 = _d.sent();
                console.error('DEFAULT ERROR', error_1);
                console.timeEnd('HANDLER');
                throw error_1;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var authorizeUpdateAccess = function (identity, channelId) { return __awaiter(void 0, void 0, void 0, function () {
    var params, Item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
                    Key: {
                        accessId: identity.username,
                        channelId: channelId
                    }
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.GetCommand(params))];
            case 1:
                Item = (_a.sent()).Item;
                if (!Item) {
                    console.error('Channel Access not found on User');
                    return [2 /*return*/, false];
                }
                if (Item.accessType === 'READ') {
                    console.error('Write access not allowed for user');
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
        }
    });
}); };
var updateChannel = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var params, Attributes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
                    Key: {
                        id: data.id
                    },
                    ReturnValues: 'ALL_NEW',
                    AttributeUpdates: {
                        chatflowId: {
                            Action: 'PUT',
                            Value: data.chatflowId
                        },
                        indexChatflowId: {
                            Action: 'PUT',
                            Value: data.indexChatflowId
                        },
                        apiHost: {
                            Action: 'PUT',
                            Value: data.apiHost
                        },
                        apiKey: {
                            Action: 'PUT',
                            Value: data.apiKey
                        },
                        name: {
                            Action: 'PUT',
                            Value: data.name
                        },
                        description: {
                            Action: 'PUT',
                            Value: data.description
                        },
                        //   chatSpaceId: {
                        //     Action: 'PUT',
                        //     Value: data.chatSpaceId,
                        //   },
                        isPublic: {
                            Action: 'PUT',
                            Value: data.isPublic
                        },
                        initialPrompts: {
                            Action: 'PUT',
                            Value: data.initialPrompts
                        },
                        updatedAt: {
                            Action: 'PUT',
                            Value: new Date().toISOString()
                        }
                    }
                };
                console.log(params);
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.UpdateCommand(params))];
            case 1:
                Attributes = (_a.sent()).Attributes;
                return [2 /*return*/, Attributes];
        }
    });
}); };
