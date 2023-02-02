"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPermission(requestUserId, resourceUserId) {
    return requestUserId.toString() === resourceUserId.toString();
}
;
exports.default = checkPermission;
