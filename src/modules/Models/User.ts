import mongoose from 'mongoose'
import uniqueString from 'unique-string';

//DB
let db = require('../keys').mongoURI;
mongoose.connect(
	db,
	{ useNewUrlParser: true ,useUnifiedTopology: true}
	).catch(err => console.log(err));
			

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stream_key: {
        type: String,
        default: uniqueString()
    },
    stream_title: {
        type: String,
        default: "My cool stream :)"
    },
    stream_description: {
        type: String,
        default: "Description of my cool stream :)"
    },
    avatar_url: {
        type: String,
        default: "https://cdn.discordapp.com/attachments/736368923590525039/789419292214820894/defaulltpfp.png"
    },
    email_verification_key: {
        type: String,
        default: uniqueString()
    },
    verification_status: {
        type: Boolean,
        default: false
    },
    donation_link: {
        type: String,
        default: "/streams/donate"
    },
    can_stream: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    banreason: {
        type: String,
        default: "TOS Violation"
    },
    following: {
        type: Array,
    },
    followers: {
        type: Array,
    },
    live_viewers: {
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    discordID: {
        type: String,
        default: "YOUR_DISCORD_ID_HERE"
    },
    isVip: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

export default User;