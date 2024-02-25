"use strict";
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
exports.uploadRawText = exports.getChannel = exports.generateFormData = exports.createChannelDocument = exports.authorizeUpdateAccess = void 0;
var FormData = require("form-data");
var client_s3_1 = require("@aws-sdk/client-s3");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService, {
    marshallOptions: { removeUndefinedValues: true }
});
var s3Client = new client_s3_1.S3Client({ region: process.env.REGION });
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
exports.authorizeUpdateAccess = authorizeUpdateAccess;
var generateFormData = function (s3Key) { return __awaiter(void 0, void 0, void 0, function () {
    var input, Body, formData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                input = {
                    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
                    Key: s3Key
                };
                return [4 /*yield*/, s3Client.send(new client_s3_1.GetObjectCommand(input))];
            case 1:
                Body = (_a.sent()).Body;
                formData = new FormData();
                formData.append('files', Body, {
                    filename: s3Key,
                    contentType: 'text/plain'
                });
                return [2 /*return*/, formData];
        }
    });
}); };
exports.generateFormData = generateFormData;
var uploadRawText = function (body, path) { return __awaiter(void 0, void 0, void 0, function () {
    var input, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                input = {
                    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
                    Key: path,
                    Body: body,
                    ContentType: 'text/plain'
                };
                return [4 /*yield*/, s3Client.send(new client_s3_1.PutObjectCommand(input))];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/];
        }
    });
}); };
exports.uploadRawText = uploadRawText;
var getChannel = function (channelId) { return __awaiter(void 0, void 0, void 0, function () {
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
                if (!Item) {
                    throw new Error('Channel not found');
                }
                return [2 /*return*/, Item];
        }
    });
}); };
exports.getChannel = getChannel;
var createChannelDocument = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME,
                    Item: __assign(__assign({}, input), { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.PutCommand(params))];
            case 1:
                _a.sent();
                return [2 /*return*/, params.Item];
        }
    });
}); };
exports.createChannelDocument = createChannelDocument;
