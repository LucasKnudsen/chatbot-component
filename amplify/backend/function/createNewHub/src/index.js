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
var authorizers_1 = require("./authorizers");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: process.env.REGION });
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, isMock, input, isAuthorized, _b, _c, CognitoUser, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.time('HANDLER');
                _d.label = 1;
            case 1:
                _d.trys.push([1, 11, , 12]);
                _a = event.arguments, isMock = _a.isMock, input = _a.input;
                !isMock && console.log(event);
                if (!isMock) return [3 /*break*/, 2];
                _b = true;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        return [2 /*return*/, (_a = identity['cognito:groups']) === null || _a === void 0 ? void 0 : _a.includes('SuperAdmin')];
                    });
                }); })];
            case 3:
                _b = _d.sent();
                _d.label = 4;
            case 4:
                isAuthorized = _b;
                if (!isAuthorized) {
                    throw new Error('Unauthorized access');
                }
                _c = input.flow;
                switch (_c) {
                    case 'CREATE': return [3 /*break*/, 5];
                    case 'CLEANUP': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 5: return [4 /*yield*/, createCognitoRecords(input)];
            case 6:
                CognitoUser = _d.sent();
                return [2 /*return*/, CognitoUser.User.Attributes.find(function (attr) { return attr.Name === 'sub'; }).Value];
            case 7: return [4 /*yield*/, cleanUpCognitoRecords(input)];
            case 8:
                _d.sent();
                return [3 /*break*/, 10];
            case 9: throw Error('Invalid flow');
            case 10:
                console.timeEnd('HANDLER');
                return [3 /*break*/, 12];
            case 11:
                error_1 = _d.sent();
                console.error('DEFAULT ERROR', error_1);
                console.timeEnd('HANDLER');
                throw error_1;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var createRecord = function (tableName, item) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: tableName,
                    Item: item
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.PutCommand(params))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var createCognitoRecords = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var adminId, adminEmail, organizationId, chatSpaceId, hostType, orgAdminGroupName, chatSpaceAdminGroupName, CognitoUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                adminId = input.adminId, adminEmail = input.adminEmail, organizationId = input.organizationId, chatSpaceId = input.chatSpaceId, hostType = input.hostType;
                orgAdminGroupName = "".concat(organizationId, "-ORG-Admin");
                chatSpaceAdminGroupName = "".concat(chatSpaceId, "-HUB-Admin");
                return [4 /*yield*/, Promise.all([
                        cognitoClient.send(new client_cognito_identity_provider_1.AdminCreateUserCommand({
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                            Username: adminId,
                            UserAttributes: [
                                {
                                    Name: 'email',
                                    Value: adminEmail
                                },
                                {
                                    Name: 'email_verified',
                                    Value: 'true'
                                },
                                {
                                    Name: 'custom:userId',
                                    Value: adminId
                                },
                            ],
                            ClientMetadata: {
                                // This is used to pass data to the Invite Lambda Trigger
                                organizationId: organizationId,
                                chatSpaceId: chatSpaceId,
                                hostType: hostType,
                                userRole: 'ADMIN'
                            }
                        })),
                        cognitoClient.send(new client_cognito_identity_provider_1.CreateGroupCommand({
                            GroupName: orgAdminGroupName,
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID
                        })),
                        // Create Admin Group for Chat Space
                        cognitoClient.send(new client_cognito_identity_provider_1.CreateGroupCommand({
                            GroupName: chatSpaceAdminGroupName,
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID
                        })),
                    ])];
            case 1:
                CognitoUser = (_a.sent())[0];
                return [4 /*yield*/, Promise.all([
                        cognitoClient.send(new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
                            GroupName: orgAdminGroupName,
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                            Username: adminId
                        })),
                        // Add Admin to Chat Space Admin Group
                        cognitoClient.send(new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
                            GroupName: chatSpaceAdminGroupName,
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                            Username: adminId
                        })),
                        // All Admins are also added to the Admin Group
                        cognitoClient.send(new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
                            GroupName: 'Admin',
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                            Username: adminId
                        })),
                    ])];
            case 2:
                _a.sent();
                return [2 /*return*/, CognitoUser];
        }
    });
}); };
var cleanUpCognitoRecords = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var adminId, organizationId, chatSpaceId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                adminId = input.adminId, organizationId = input.organizationId, chatSpaceId = input.chatSpaceId;
                return [4 /*yield*/, Promise.allSettled([
                        cognitoClient.send(new client_cognito_identity_provider_1.AdminDeleteUserCommand({
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
                            Username: adminId
                        })),
                        cognitoClient.send(new client_cognito_identity_provider_1.DeleteGroupCommand({
                            GroupName: "".concat(organizationId, "-ORG-Admin"),
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID
                        })),
                        cognitoClient.send(new client_cognito_identity_provider_1.DeleteGroupCommand({
                            GroupName: "".concat(chatSpaceId, "-HUB-Admin"),
                            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID
                        })),
                    ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
