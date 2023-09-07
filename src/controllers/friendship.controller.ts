import { Friendship } from '../models/Friendship'
import { User } from '../models/User'
import { Controller } from '../types/routeTypes'

export const sendFriendshipRequest: Controller = async (req, res) => {
  try {
    const sender: any = req.user
    const senderId = sender.id
    const targetId = req.params.friend_id

    const targetExists = await User.findById(targetId)
    if (!targetExists) {
      return res.status(404).json({ msg: 'User not found' })
    }

    const friendship = new Friendship({
      user1: senderId,
      user2: targetId,
      status: 1,
    })
    await friendship.save()

    res.status(201).json({ friendship })
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const acceptFriendshipRequest: Controller = async (req, res) => {
  try {
    const accepter: any = req.user
    const accepterId = accepter.id
    const sender = req.params.friend_id

    const request = await Friendship.findOne({
      user1: sender,
      user2: accepterId,
      status: 1,
    })
    if (!request) {
      return res.status(404).json({ msg: 'Friendship request not found' })
    }

    await request.updateOne({ status: 3 })
    await request.save()

    res.status(201).json({ request })

  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const deleteFriend: Controller = async (req, res) => {
  try {
    const deleter: any = req.user
    const target = req.params.friend_id

    let friendship = await Friendship.findOne({
      user1: deleter,
      user2: target,
      status: 3,
    })

    if (friendship) {
      await friendship.updateOne({ status: 2 })
      await friendship.save()

      return res.status(200).json({ friendship })
    }

    friendship = await Friendship.findOne({
      user1: target,
      user2: deleter,
      status: 3,
    })
    if (!friendship) {
      return res.status(404).json({ msg: 'Friendship request not found' })
    }

    await friendship.updateOne({ status: 2 })
    await friendship.save()

    res.status(200).json({ friendship })
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const destroyFriendship: Controller = async (req, res) => {
  try {
    const destroyer: any = req.user
    const destroyerId = destroyer.id
    const deleterId = req.params.friend_id

    const friendship = await Friendship.findOne({
      $or: [
        { user1: destroyerId, user2: deleterId, status: 2 },
        { user1: deleterId, user2: destroyerId, status: 2 },
      ],
    })

    if (!friendship) {
      return res.status(404).json({ msg: 'Friendship request not found' })
    }

    await friendship.deleteOne()

    res.status(200).json({ msg: 'Success' })
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}
