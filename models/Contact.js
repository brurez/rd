const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  visits: [
    {
      url: { type: String, required: true },
      visitedAt: { type: Date, required: true }
    }
  ],
  createdAt: { type: Date, default: new Date() }

});

mongoose.model('contacts', contactSchema);
