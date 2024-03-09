"use strict";
//@ts-nocheck
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
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var authorizers_1 = require("./authorizers");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuthorized, _a, isMock, input_1, data, _b, chatSpace_1, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.time('HANDLER');
                isAuthorized = false;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 12, , 13]);
                _a = event.arguments, isMock = _a.isMock, input_1 = _a.input;
                !isMock && console.log("EVENT", event);
                data = void 0;
                _b = input_1.flow;
                switch (_b) {
                    case 'BY_ID': return [3 /*break*/, 2];
                    case 'BY_CHAT_SPACE': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 10];
            case 2: return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, authorizeChannelAccess(identity, input_1.channelId)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })];
            case 3:
                isAuthorized = _c.sent();
                if (!isAuthorized) {
                    throw new Error('Unauthorized to fetch channel');
                }
                return [4 /*yield*/, fetchSingleChannel(input_1.channelId)];
            case 4:
                data = _c.sent();
                return [3 /*break*/, 11];
            case 5: return [4 /*yield*/, getChatSpace(input_1.chatSpaceId)];
            case 6:
                chatSpace_1 = _c.sent();
                if (!!chatSpace_1.isPublic) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, authorizeAdminAccess(identity, chatSpace_1)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 7:
                isAuthorized = _c.sent();
                if (!isAuthorized) {
                    throw new Error('Unauthorized to fetch channels');
                }
                _c.label = 8;
            case 8: return [4 /*yield*/, fetchChannelsByChatSpace(input_1.chatSpaceId, chatSpace_1.isPublic)];
            case 9:
                data = _c.sent();
                return [3 /*break*/, 11];
            case 10:
                console.timeEnd('HANDLER');
                throw new Error('Invalid flow');
            case 11:
                console.timeEnd('HANDLER');
                return [2 /*return*/, data];
            case 12:
                error_1 = _c.sent();
                console.error('DEFAULT ERROR', error_1);
                console.timeEnd('HANDLER');
                throw error_1;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var fetchSingleChannel = function (channelId) { return __awaiter(void 0, void 0, void 0, function () {
    var params, Item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
                    Key: {
                        id: channelId
                    }
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.GetCommand(params))];
            case 1:
                Item = (_a.sent()).Item;
                return [2 /*return*/, [Item]];
        }
    });
}); };
var authorizeAdminAccess = function (identity, chatSpace) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, (_a = identity['cognito:groups']) === null || _a === void 0 ? void 0 : _a.includes(chatSpace.admin)];
    });
}); };
var authorizeChannelAccess = function (identity, channelId) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [2 /*return*/, true];
        }
    });
}); };
var fetchChannelsByChatSpace = function (chatSpaceId, isPublic) { return __awaiter(void 0, void 0, void 0, function () {
    var params, Items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
                    IndexName: 'byChatSpace',
                    KeyConditionExpression: 'chatSpaceId = :chatSpaceId',
                    ExpressionAttributeValues: {
                        ':chatSpaceId': chatSpaceId,
                        ':isPublic': isPublic
                    },
                    FilterExpression: isPublic ? 'isPublic = :isPublic' : undefined
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.QueryCommand(params))];
            case 1:
                Items = (_a.sent()).Items;
                return [2 /*return*/, Items];
        }
    });
}); };
var getChatSpace = function (chatSpaceId) { return __awaiter(void 0, void 0, void 0, function () {
    var params, Item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME,
                    Key: {
                        id: chatSpaceId
                    }
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.GetCommand(params))];
            case 1:
                Item = (_a.sent()).Item;
                if (!Item) {
                    throw new Error('ChatSpace not found');
                }
                return [2 /*return*/, Item];
        }
    });
}); };
