import { Profile } from '../models/Profile'
import { Controller } from '../types/routeTypes'
import { validateProfileInput } from '../validation/profile.validation'

export const getProfileByUserId: Controller = async (req, res) => {
  try {
    const userId = req.params.user_id

    const profile = await Profile.findOne({ user: userId })
    if (!profile) {
      return res
        .status(500)
        .json({ msg: `Server error: user profile not found` })
    }

    res.status(200).json(profile)
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const updateProfile: Controller = async (req, res) => {
  try {
    const { errors, isValid } = validateProfileInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const user: any = req.user
    const profile = await Profile.findOne({ user: user.id })

    const { name, surname, birthday, avatar, city, about } = req.body

    if (!profile) {
      return res
        .status(500)
        .json({ msg: 'Server error: user profile not found' })
    }

    await profile.updateOne({
      name,
      surname,
      birthday,
      avatar,
      city,
      about,
    })

    await profile.save()

    res.status(200).json(profile)
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}
