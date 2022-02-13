import * as mongoose from 'mongoose';
export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  slot: { type: String, required: true },
  eventDate: { type: String, required: true },
});

export interface Event extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  slot: string;
  eventDate: string;
}
