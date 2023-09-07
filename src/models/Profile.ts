import { model, Schema, SchemaTypes } from 'mongoose'

const ProfileSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
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
      default: new Date(0),
    },
    avatar: {
      type: SchemaTypes.String,
      default: '',
    },
    city: {
      type: SchemaTypes.String,
      default: '',
    },
    about: {
      type: SchemaTypes.String,
      default: '',
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export const Profile = model('profiles', ProfileSchema)
