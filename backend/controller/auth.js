import User from '../model/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type,
      stream: req.body.stream,
      email: req.body.email,
      password: hash,
    })

    await newUser.save()
    res.status(200).json('User has been created')
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, 'User not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(404, 'Wrong Password or Username'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, isAdmin, ...otherDetails } = user._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({details: { ...otherDetails }, isAdmin})
  } catch (err) {
    next(err)
  }
}