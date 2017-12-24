const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitSchema = new Schema({
  url: { type: String, required: true },
  visitedAt: { type: Date, required: true },
  uuid: { type: String, required: false },
  _contact: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'contacts'
  },
});

mongoose.model('visits', visitSchema);
