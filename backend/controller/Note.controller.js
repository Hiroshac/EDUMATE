import TeacherNotesModel from '../model/TeacherNotes.model.js'
import multer from 'multer'

//multer and file location
export const Upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'TeacherNotes')
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname)
    },
  }),
})

//Create Industry
export const CreateNote = async (req, res, next) => {
  try {
    const newTeacherNote = new TeacherNotesModel({
      lesson_name: req.body.lesson_name,
      subject: req.body.subject,
      grade: req.body.grade,
      note: req.file.originalname,
    })
    await newTeacherNote.save()
    res.status(200).json('Student Answers has been created.....')
  } catch (err) {
    next(err)
  }
}

//Update Industry

export const UpdateNote = async (req, res, next) => {
  try {
    const updateTeacherNote = await TeacherNotesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateTeacherNote)
  } catch (err) {
    next(err)
  }
}

//Delete Industry
export const DeleteNote = async (req, res, next) => {
  try {
    await TeacherNotesModel.findByIdAndDelete(req.params.id)

    res.status(200).json('Note has been deleted')
  } catch (err) {
    next(err)
  }
}

//Get Industry
export const GetNote = async (req, res, next) => {
  try {
    const getTeacherNote = await TeacherNotesModel.findById(req.params.id)

    res.status(200).json(getTeacherNote)
  } catch (err) {
    next(err)
  }
}

//Get all Industry
export const GetTeacherNotes = async (req, res, next) => {
  try {
    const getTeacherNotes = await TeacherNotesModel.find()

    res.status(200).json(getTeacherNotes)
  } catch (err) {
    next(err)
  }
}