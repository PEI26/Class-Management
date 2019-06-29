import studentclassesModel from '../models/studentclasses'
export default {
    list: async (req, res, next) => {
      try {
        const studentclasses = await studentclassesModel.findAll(req, next)
        res.status(200).json({
          studentclasses: studentclasses
        })
      } catch (err) {
        next(err)
      }
    },
    create: async (req, res, next) => {
      try {
       
          const studentclasses = {
            ...req.body
          }
          
          studentclasses.class_id = req.class_id *1
          const studentID = await studentclassesModel.create(studentclasses, next)
         
              const created = await studentclassesModel.findById(await studentID, next)
          return res.status(200).send({
            studentclasses: created
          })
        
      } catch (err) {
        next(err)
      }
    },
      destroy: async (req, res, next) => {
        try {
         
          
            const id = req.params.id * 1
            const subjectClasses = await studentclassesModel.findById(id, next)
            if (subjectClasses !== undefined) {
              const deletedClasses = await studentclassesModel.destroy(id, next)
              if (deletedClasses !== undefined) {
                return res.status(200).send({
                  id: id
                })
              } else {
                res.status(404).end()
              }
            } else {
              res.status(404).send({
                error: 'the requested students doesnt exist'
              })
            }
          
        } catch (err) {
          next(err)
        }
      }
}