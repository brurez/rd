const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  createdAt: { type: Date, default: new Date() }

});

mongoose.model('contacts', contactSchema);
