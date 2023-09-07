import { model, Schema, SchemaTypes } from 'mongoose'

const UserSchema = new Schema(
  {
    username: {
      type: SchemaTypes.String,
      unique: true,
      required: true,
      minLength: 6,
      maxLength: 20,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    emailConfirmed: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
)

export const User = model('users', UserSchema)
