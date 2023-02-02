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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name !'],
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name !'],
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     'Please provide a valid email',
        // ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        select: false,
        minLength: 3,
        maxLength: 30,
    },
    location: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        default: 'TP.HCM'
    }
}, { timestamps: true });
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return;
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, this.password);
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
