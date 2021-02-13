import mongoose from 'mongoose';

const stickerSchema = new mongoose.Schema({
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

const Sticker = mongoose.model(`Sticker`, stickerSchema);
export default Sticker;
