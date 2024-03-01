"use strict";
/* Amplify Params - DO NOT EDIT
    API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
    API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
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
var util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var ddbService = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbService);
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var modifyRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                modifyRecords = event.Records.flatMap(function (record) {
                    return record.eventName === 'MODIFY'
                        ? {
                            "new": (0, util_dynamodb_1.unmarshall)(record.dynamodb.NewImage),
                            old: (0, util_dynamodb_1.unmarshall)(record.dynamodb.OldImage)
                        }
                        : [];
                });
                console.log(modifyRecords);
                // Loop over each record and check if name or description has been updated
                return [4 /*yield*/, Promise.all(modifyRecords.map(function (record) {
                        if (record["new"].name !== record.old.name ||
                            record["new"].description !== record.old.description ||
                            record["new"].subtitle !== record.old.subtitle ||
                            record["new"].avatar !== record.old.avatar) {
                            // If name or description has been updated, we should look for all access records and update the channel name and description
                            return updateChannelUserAccess(record["new"].id, {
                                channelName: record["new"].name,
                                channelDescription: record["new"].description,
                                channelSubtitle: record["new"].subtitle,
                                channelAvatar: record["new"].avatar
                            });
                        }
                    }))];
            case 1:
                // Loop over each record and check if name or description has been updated
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var updateChannelUserAccess = function (channelId, attributes) { return __awaiter(void 0, void 0, void 0, function () {
    var queryCommand, Items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryCommand = {
                    TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
                    IndexName: 'byChannel',
                    KeyConditionExpression: 'channelId = :channelId',
                    ExpressionAttributeValues: {
                        ':channelId': channelId
                    }
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.QueryCommand(queryCommand))];
            case 1:
                Items = (_a.sent()).Items;
                console.log('Items to update: ', Items.length);
                // Update each access record with the new channel name and description
                return [4 /*yield*/, Promise.all(Items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var updateExpression, expressionAttributeValues, updateCommand;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    updateExpression = 'SET updatedAt = :updatedAt';
                                    expressionAttributeValues = {
                                        ':updatedAt': new Date().toISOString()
                                    };
                                    // Add dynamic attributes from 'data' to the update expression
                                    Object.keys(attributes).forEach(function (key) {
                                        if (key !== 'id' && key !== 'name') {
                                            // Append to update expression
                                            updateExpression += ", ".concat(key, " = :").concat(key);
                                            // Add to expression attribute values
                                            expressionAttributeValues[":".concat(key)] = attributes[key];
                                        }
                                    });
                                    updateCommand = {
                                        TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
                                        Key: {
                                            accessId: item.accessId,
                                            channelId: item.channelId
                                        },
                                        UpdateExpression: updateExpression,
                                        ExpressionAttributeValues: expressionAttributeValues
                                    };
                                    return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.UpdateCommand(updateCommand))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                // Update each access record with the new channel name and description
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
