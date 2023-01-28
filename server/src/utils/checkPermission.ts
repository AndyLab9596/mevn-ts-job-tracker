import { Types } from "mongoose";

function checkPermission(requestUserId: Types.ObjectId, resourceUserId: Types.ObjectId): boolean {
    return requestUserId.toString() === resourceUserId.toString()
};

export default checkPermission;