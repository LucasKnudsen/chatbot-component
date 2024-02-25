"use strict";
/* Amplify Params - DO NOT EDIT
    API_DIGITALTWIN_CHANNELDOCUMENTTABLE_ARN
    API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME
    API_DIGITALTWIN_CHANNELTABLE_ARN
    API_DIGITALTWIN_CHANNELTABLE_NAME
    API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
    API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
    API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
    AUTH_FRAIAAUTH_USERPOOLID
    ENV
    REGION
    STORAGE_FRAIASTORAGE_BUCKETNAME
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
var node_fetch_1 = require("node-fetch");
var authorizers_1 = require("./authorizers");
var parsers_1 = require("./parsers");
var utils_1 = require("./utils");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, isMock, input_1, isAuthorized, _b, channel, endpoint, parsedText, _c, formData, result, channelDocument, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.time('HANDLER');
                _d.label = 1;
            case 1:
                _d.trys.push([1, 15, , 16]);
                _a = event.arguments, isMock = _a.isMock, input_1 = _a.input;
                !isMock && console.log(event);
                if (!isMock) return [3 /*break*/, 2];
                _b = true;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, authorizers_1.authorizeToken)(event.request.headers.authorization, function (identity) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, utils_1.authorizeUpdateAccess)(identity, input_1.channelId)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })];
            case 3:
                _b = _d.sent();
                _d.label = 4;
            case 4:
                isAuthorized = _b;
                if (!isAuthorized) {
                    throw new Error('Unauthorized to index knowledge');
                }
                return [4 /*yield*/, (0, utils_1.getChannel)(input_1.channelId)];
            case 5:
                channel = _d.sent();
                endpoint = "".concat(channel.apiHost, "/api/v1/vector/upsert/").concat(channel.indexChatflowId);
                if (!(input_1.fileType !== 'text/plain')) return [3 /*break*/, 11];
                parsedText = '';
                _c = input_1.fileType;
                switch (_c) {
                    case 'application/pdf': return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, parsers_1.parsePDF)(input_1.s3KeyOriginal)];
            case 7:
                parsedText = _d.sent();
                return [3 /*break*/, 9];
            case 8: throw new Error('Document type not supported for parsing raw text');
            case 9: 
            // Uploads it to S3
            return [4 /*yield*/, (0, utils_1.uploadRawText)(parsedText, input_1.s3KeyRawText)];
            case 10:
                // Uploads it to S3
                _d.sent();
                _d.label = 11;
            case 11: return [4 /*yield*/, (0, utils_1.generateFormData)(input_1.s3KeyRawText)];
            case 12:
                formData = _d.sent();
                return [4 /*yield*/, (0, node_fetch_1["default"])(endpoint, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Authorization: channel.apiKey
                        }
                    })];
            case 13:
                result = _d.sent();
                if (!result.ok) {
                    throw new Error("HTTP error! status: ".concat(result.status));
                }
                return [4 /*yield*/, (0, utils_1.createChannelDocument)(__assign({}, input_1))];
            case 14:
                channelDocument = _d.sent();
                console.timeEnd('HANDLER');
                return [2 /*return*/, channelDocument];
            case 15:
                error_1 = _d.sent();
                console.error('DEFAULT ERROR', error_1);
                console.timeEnd('HANDLER');
                throw error_1;
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
