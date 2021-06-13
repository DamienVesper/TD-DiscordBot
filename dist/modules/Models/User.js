"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function makeid(length) {
    let result = ``;
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
// DB
const db = require(`../keys`).mongoURI;
mongoose_1.default.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    creationIP: {
        type: String,
        required: false
    },
    lastIP: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        required: true
    },
    token: {
        type: String,
        default: makeid(64),
        required: false
    },
    password: {
        type: String,
        required: true
    },
    live: {
        type: String,
        default: false,
        required: false
    },
    verified: {
        type: Boolean,
        required: false
    },
    verifyToken: {
        type: String,
        required: false
    },
    isSuspended: {
        type: Boolean,
        default: false,
        required: false
    },
    avatarURL: {
        type: String,
        default: `/assets/uploads/defaultpfp.png`,
        required: false
    },
    channel: {
        moderators: {
            type: Array,
            default: [],
            required: false
        },
        bans: {
            type: Array,
            default: [],
            required: false
        }
    },
    perms: {
        staff: {
            type: Boolean,
            default: false,
            required: false
        },
        vip: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    settings: {
        streamKey: {
            type: String,
            default: makeid(32),
            required: false
        },
        title: {
            type: String,
            default: `My Cool Stream!`,
            required: false
        },
        description: {
            type: String,
            default: `A description about my cool stream!`,
            required: false
        },
        donationLink: {
            type: String,
            default: `/streams/donate`,
            required: false
        }
    },
    viewers: {
        type: Array,
        default: [],
        required: false
    },
    followers: {
        type: Array,
        default: [],
        required: false
    }
});
const User = mongoose_1.default.model(`User`, UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map