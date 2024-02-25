"use strict";
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
exports.indexDocument = void 0;
var FormData = require("form-data");
var node_fetch_1 = require("node-fetch");
var client_s3_1 = require("@aws-sdk/client-s3");
var s3Client = new client_s3_1.S3Client({ region: process.env.REGION });
var indexDocument = function (channel, s3Key) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, formData, result, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                endpoint = "".concat(channel.apiHost, "/api/v1/vector/upsert/").concat(channel.indexChatflowId);
                return [4 /*yield*/, generateFormData(s3Key)];
            case 1:
                formData = _d.sent();
                return [4 /*yield*/, (0, node_fetch_1["default"])(endpoint, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Authorization: channel.apiKey
                        }
                    })];
            case 2:
                result = _d.sent();
                if (!!result.ok) return [3 /*break*/, 3];
                throw new Error("HTTP error! status: ".concat(result.status));
            case 3:
                _b = (_a = console).log;
                _c = ['Result: '];
                return [4 /*yield*/, result.text()];
            case 4:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/, '200'];
        }
    });
}); };
exports.indexDocument = indexDocument;
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
