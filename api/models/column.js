const mongoose = require('mongoose');

const columnSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  logs: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('column', columnSchema);
