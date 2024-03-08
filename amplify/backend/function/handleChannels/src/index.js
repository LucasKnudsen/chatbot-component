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
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var authorizers_1 = require("./authorizers");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuthorized, identity, _a, isMock, input_1, _b, _c, chatSpace_1, _d, newChannel, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                console.time('HANDLER');
                isAuthorized = false;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 16, , 17]);
                _a = event.arguments, isMock = _a.isMock, input_1 = _a.input;
                !isMock && console.log(event);
                !isMock && console.log("EVENT input", event.arguments.input);
                _b = input_1.flow;
                switch (_b) {
                    case 'UPDATE': return [3 /*break*/, 2];
                    case 'CREATE': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 14];
            case 2:
                if (!isMock) return [3 /*break*/, 3];
                _c = { username: 'a05d64f3-6d58-49d1-8143-d59caa88fd1f' };
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, authorizeUpdateAccess(identity, input_1.data.id)];
                            case 1:
                                isAuthorized = _a.sent();
                                if (!isAuthorized) {
                                    throw new Error('Unauthorized to update channel');
                                }
                                return [2 /*return*/, identity];
                        }
                    });
                }); })];
            case 4:
                _c = _e.sent();
                _e.label = 5;
            case 5:
                identity = _c;
                return [4 /*yield*/, updateChannel(input_1.data)];
            case 6: return [2 /*return*/, _e.sent()];
            case 7: return [4 /*yield*/, getChatSpace(input_1.data.chatSpaceId)];
            case 8:
                chatSpace_1 = _e.sent();
                if (!isMock) return [3 /*break*/, 9];
                _d = { username: 'a05d64f3-6d58-49d1-8143-d59caa88fd1f' };
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, authorizeCreateAccess(identity, chatSpace_1)];
                            case 1:
                                isAuthorized = _a.sent();
                                if (!isAuthorized) {
                                    throw new Error('Unauthorized to create new channel');
                                }
                                return [2 /*return*/, identity];
                        }
                    });
                }); })];
            case 10:
                _d = _e.sent();
                _e.label = 11;
            case 11:
                identity = _d;
                return [4 /*yield*/, createChannel(input_1.data)];
            case 12:
                newChannel = _e.sent();
                return [4 /*yield*/, createChannelAccess(input_1.data, identity, chatSpace_1)];
            case 13:
                _e.sent();
                return [2 /*return*/, newChannel];
            case 14: return [3 /*break*/, 15];
            case 15:
                console.timeEnd('HANDLER');
                return [3 /*break*/, 17];
            case 16:
                error_1 = _e.sent();
                console.error('DEFAULT ERROR', error_1);
                console.timeEnd('HANDLER');
                throw error_1;
            case 17: return [2 /*return*/];
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
var authorizeCreateAccess = function (identity, chatSpace) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, (_a = identity['cognito:groups']) === null || _a === void 0 ? void 0 : _a.includes(chatSpace.admin)];
    });
}); };
var updateChannel = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var updateExpression, expressionAttributeValues, expressionAttributeNames, params, Attributes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateExpression = 'SET updatedAt = :updatedAt , #channelName = :channelName';
                expressionAttributeValues = {
                    ':channelName': data.name,
                    ':updatedAt': new Date().toISOString()
                };
                expressionAttributeNames = {
                    '#channelName': 'name'
                };
                // Add dynamic attributes from 'data' to the update expression
                Object.keys(data).forEach(function (key) {
                    if (key !== 'id' && key !== 'name') {
                        // Append to update expression
                        updateExpression += ", ".concat(key, " = :").concat(key);
                        // Add to expression attribute values
                        expressionAttributeValues[":".concat(key)] = data[key];
                    }
                });
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
                    Key: {
                        id: data.id
                    },
                    ReturnValues: 'ALL_NEW',
                    UpdateExpression: updateExpression,
                    ExpressionAttributeValues: expressionAttributeValues,
                    ExpressionAttributeNames: expressionAttributeNames
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.UpdateCommand(params))];
            case 1:
                Attributes = (_a.sent()).Attributes;
                return [2 /*return*/, Attributes];
        }
    });
}); };
var createChannel = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
                    Item: __assign(__assign({}, data), { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.PutCommand(params))];
            case 1:
                _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
var createChannelAccess = function (data, identity, chatSpace) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
                    Item: {
                        accessId: identity.username,
                        channelId: data.id,
                        chatSpaceId: data.chatSpaceId,
                        channelHostId: chatSpace.hostId,
                        channelHostType: chatSpace.hostType,
                        accessType: 'ADMIN',
                        channelName: data.name,
                        channelDescription: data.description,
                        channelAvatar: data.avatar,
                        channelSubtitle: data.subtitle,
                        owner: identity.username,
                        __typename: 'ChannelUserAccess',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.PutCommand(params))];
            case 1:
                _a.sent();
                return [2 /*return*/, data];
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
