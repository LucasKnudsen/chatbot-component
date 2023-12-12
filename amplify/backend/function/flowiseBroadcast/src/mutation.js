"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish2channel = void 0;
exports.publish2channel = "\n  mutation Publish2channel($sessionId: String!, $data: AWSJSON!) {\n    publish2channel(sessionId: $sessionId, data: $data) {\n      sessionId\n      data\n      __typename\n    }\n  }\n";
