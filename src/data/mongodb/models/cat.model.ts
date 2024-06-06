import mongoose, { Schema } from 'mongoose';

const catSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  reference_image_id: {
    type: String,
  },
  temperament: {
    type: String, 
  },
  origin: {
    type: String,
  },
  life_span: {
    type: String,
  },
  description: {
    type: String,
  }

});

export const CatModel = mongoose.model('Cat', catSchema );