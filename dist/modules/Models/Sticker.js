"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stickerSchema = new mongoose_1.default.Schema({
    stickerName: {
        type: String,
        required: true
    },
    ownerUsername: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    channelsBannedOn: {
        type: Array,
        default: [],
        required: false
    }
});
const Sticker = mongoose_1.default.model(`Sticker`, stickerSchema);
exports.default = Sticker;
//# sourceMappingURL=Sticker.js.map