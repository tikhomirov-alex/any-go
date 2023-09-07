import { model, Schema, SchemaTypes } from 'mongoose'

const FriendshipSchema = new Schema({
  user1: {
    type: SchemaTypes.ObjectId,
    ref: 'users',
    required: true,
  },
  user2: {
    type: SchemaTypes.ObjectId,
    ref: 'users',
    required: true,
  },
  status: {
    // 1 - 1->2, 2 - 1<-2, 3 - 1<->2
    enum: [1, 2, 3],
    required: true,
  },
})

export const Friendship = model('friends', FriendshipSchema)
