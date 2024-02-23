"use strict";
// @ts-nocheck
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
exports.authorize = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var jwt = require('jsonwebtoken');
var jwksClient = require('jwks-rsa');
var client = jwksClient({
    jwksUri: "https://cognito-idp.".concat(process.env.REGION, ".amazonaws.com/").concat(process.env.AUTH_FRAIAAUTH_USERPOOLID, "/.well-known/jwks.json")
});
var getSigningKey = function (header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        if (err) {
            callback(err, null);
        }
        else {
            var signingKey = key.getPublicKey();
            callback(null, signingKey);
        }
    });
};
var authorize = function (token, chatSpaceIds) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, chatSpace, userGroups;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    throw new Error('MISSING_TOKEN');
                }
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        // Validate and decode the token
                        jwt.verify(token, getSigningKey, { algorithms: ['RS256'] }, function (err, decoded) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                console.log(decoded); // Decoded token
                                resolve(decoded);
                            }
                        });
                    })
                    // Use the decoded token to authorize the user
                    // Get the ChatSpace and check if admin exists on the User groups
                ];
            case 1:
                decodedToken = _a.sent();
                return [4 /*yield*/, getChatSpace(chatSpaceIds)];
            case 2:
                chatSpace = _a.sent();
                userGroups = decodedToken['cognito:groups'];
                if (!chatSpace) {
                    throw new Error('CHAT_SPACE_NOT_FOUND');
                }
                if (!userGroups.includes(chatSpace.admin)) {
                    throw new Error('UNAUTHORIZED');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.authorize = authorize;
var getChatSpace = function (_a) {
    var chatSpaceOwnerId = _a.chatSpaceOwnerId, chatSpaceId = _a.chatSpaceId;
    return __awaiter(void 0, void 0, void 0, function () {
        var params, command, Item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = {
                        TableName: process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME,
                        Key: {
                            ownerId: chatSpaceOwnerId,
                            id: chatSpaceId
                        }
                    };
                    command = new lib_dynamodb_1.GetCommand(params);
                    return [4 /*yield*/, ddbDocClient.send(command)];
                case 1:
                    Item = (_b.sent()).Item;
                    return [2 /*return*/, Item];
            }
        });
    });
};
