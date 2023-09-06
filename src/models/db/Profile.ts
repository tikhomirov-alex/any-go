import { Schema, SchemaTypes, model } from 'mongoose'

const ProfileSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: SchemaTypes.String,
    minLength: 2,
    maxLength: 20,
    required: true,
  },
  surname: {
    type: SchemaTypes.String,
    minLength: 2,
    maxLength: 20,
    required: true,
  },
  birthday: {
    type: SchemaTypes.Date,
  },
  avatar: {
    type: SchemaTypes.String,
  },
  city: {
    type: SchemaTypes.String,
  },
  about: {
    type: SchemaTypes.String,
  },
})

export const Profile = model('profiles', ProfileSchema)
