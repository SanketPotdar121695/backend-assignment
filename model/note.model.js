const mongoose = require('mongoose');

//Note schema
const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: String,
    subject: String,
    userID: String
  },
  {
    versionKey: false
  }
);

//Note model
const NoteModel = mongoose.model('note', noteSchema);

module.exports = { NoteModel };
