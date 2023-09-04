import { Schema, model, SchemaTypes, SchemaType } from 'mongoose'

export const UserSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    username: {
      type: SchemaTypes.String,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: SchemaTypes.String,
      required: false,
    },
    emailConfirmed: {
      type: SchemaTypes.Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: false }
)

export const User = model('users', UserSchema)
