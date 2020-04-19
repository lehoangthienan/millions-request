import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//Define schema Conversation
const millionSchema = new Schema({
  name: { type: String, required: true},
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

millionSchema.index({
  customer: 1,
})

millionSchema.plugin(uniqueValidator)

export default mongoose.model('Million', millionSchema)