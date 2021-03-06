import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import autoIncrement from "mongoose-auto-increment";

const messages = new mongoose.Schema({
  message: {
    type: String,
  },
  sender: {
    type: String,
  },
  senderName: {
    type: String,
  },

  reciever: {
    type: String,
  },
  date: {
    type: Date,
  },
  isRead: {
    type: Boolean,
  }
});


messages.plugin(uniqueValidator);

export default messages;