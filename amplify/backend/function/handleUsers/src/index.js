"use strict";
/* Amplify Params - DO NOT EDIT
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
var client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
var cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: process.env.REGION });
var authorizer_1 = require("./authorizer");
var dynamoHelpers_1 = require("./dynamoHelpers");
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var responseStatus, responseBody, body, _a, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('EVENT', event);
                console.log('Context', context);
                console.time('HANDLER');
                responseStatus = 200;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 12, 13, 14]);
                !event.isMock && console.log("EVENT BODY: ".concat(event.body));
                body = JSON.parse(event.body || '');
                _a = body.action;
                switch (_a) {
                    case 'list': return [3 /*break*/, 2];
                    case 'get': return [3 /*break*/, 5];
                    case 'invite': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 10];
            case 2:
                if (!body.chatSpaceId)
                    throw new Error('MISSING_CHAT_SPACE_ID');
                if (!body.chatSpaceOwnerId)
                    throw new Error('MISSING_CHAT_SPACE_OWNER_ID');
                return [4 /*yield*/, (0, authorizer_1.authorize)(event.headers.Authorization, {
                        chatSpaceId: body.chatSpaceId,
                        chatSpaceOwnerId: body.chatSpaceOwnerId
                    })];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, dynamoHelpers_1.listUsers)(body.chatSpaceId)];
            case 4:
                responseBody = _c.sent();
                return [3 /*break*/, 11];
            case 5:
                if (!body.userId)
                    throw new Error('MISSING_USER_ID');
                return [4 /*yield*/, (0, dynamoHelpers_1.getUser)(body.userId)];
            case 6:
                responseBody = _c.sent();
                return [3 /*break*/, 11];
            case 7:
                if (!body.chatSpaceId)
                    throw new Error('MISSING_CHAT_SPACE_ID');
                if (!body.chatSpaceOwnerId)
                    throw new Error('MISSING_CHAT_SPACE_OWNER_ID');
                return [4 /*yield*/, (0, authorizer_1.authorize)(event.headers.Authorization, {
                        chatSpaceId: body.chatSpaceId,
                        chatSpaceOwnerId: body.chatSpaceOwnerId
                    })];
            case 8:
                _c.sent();
                return [4 /*yield*/, inviteUser(body)];
            case 9:
                responseBody = _c.sent();
                _c.label = 10;
            case 10: return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 14];
            case 12:
                error_1 = _c.sent();
                console.error('DEFAULT ERROR', error_1);
                responseStatus = ((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.status) || 500;
                responseBody = {
                    message: error_1.message,
                    status: responseStatus,
                    type: error_1.type,
                    stack: error_1.stack
                };
                return [3 /*break*/, 14];
            case 13:
                console.timeEnd('HANDLER');
                return [2 /*return*/, {
                        statusCode: responseStatus,
                        body: JSON.stringify(responseBody),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': '*'
                        }
                    }];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var inviteUser = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, chatSpaceId, chatSpaceOwnerId, step, User, results, error_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newUser = body.newUser, chatSpaceId = body.chatSpaceId, chatSpaceOwnerId = body.chatSpaceOwnerId;
                step = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 9]);
                return [4 /*yield*/, cognitoClient.send(new client_cognito_identity_provider_1.AdminCreateUserCommand({
                        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                        TemporaryPassword: 'Abcd1234',
                        Username: newUser.email,
                        UserAttributes: [
                            {
                                Name: 'email',
                                Value: newUser.email
                            },
                            {
                                Name: 'email_verified',
                                Value: 'true'
                            },
                        ],
                        ClientMetadata: {
                            organizationId: chatSpaceOwnerId,
                            chatSpaceId: chatSpaceId,
                            hostType: 'PORTAL'
                        }
                    }))];
            case 2:
                User = (_b.sent()).User;
                step = 1;
                return [4 /*yield*/, Promise.all([
                        (0, dynamoHelpers_1.createUser)({
                            email: newUser.email,
                            role: newUser.role,
                            cognitoId: User.Username,
                            chatSpaceId: chatSpaceId,
                            organizationId: chatSpaceOwnerId
                        }),
                        cognitoClient.send(new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
                            GroupName: newUser.role,
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                            Username: newUser.email
                        })),
                    ])];
            case 3:
                results = _b.sent();
                return [2 /*return*/, results[0]];
            case 4:
                error_2 = _b.sent();
                _a = step;
                switch (_a) {
                    case 1: return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 5: 
            // Delete user from Cognito
            return [4 /*yield*/, cognitoClient.send(new client_cognito_identity_provider_1.AdminDeleteUserCommand({
                    UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                    Username: newUser.email
                }))];
            case 6:
                // Delete user from Cognito
                _b.sent();
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 8];
            case 8: throw error_2;
            case 9: return [2 /*return*/];
        }
    });
}); };
