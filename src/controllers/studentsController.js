import studentsModel from '../models/students'


export default {
list: async (req, res, next) => {
        try {
          const students = await studentsModel.findAll(req, next)
          res.status(200).json({
            students: students
          })
        } catch (err) {
          next(err)
        }
      },
show: async (req, res, next) => {
        try {
          const studentsId = req.params.id * 1
    
          const requestStudents = await studentsModel.findById(studentsId, next)
          if (requestStudents !== undefined) {
            return res.send(requestStudents)
          } else {
            return res.status(404).end()
          }
        } catch (err) {
          next(err)
        }
      },
showclasses: async (req,res,nect) =>{
           try {

           }catch (err){
             next(err)
           }
},
create: async (req, res, next) => {
        try {
            const students = {
              ...req.body
            }
            console.log(students)
            const student = await studentsModel.create(students, next)
            
            const created = await studentsModel.findById(await student, next)
            return res.status(200).send({
              students: created
            })
          
        } catch (err) {
          // next(err)
          console.log(err)
        }
      },
update: async (req, res, next) => {
    try {
      const id = req.params.id * 1
      const updateStudents = await studentsModel.findById(id, next)
      if (updateStudents !== null) {
         
          const studentsParams = {
            ...req.body
          }
          if (Object.keys(studentsParams).length === 0) {
            res.status(200).send({
              error: 'No data to update'
            })
          }
          await studentsModel.update(id, studentsParams, next)
          const updated = await studentsModel.findById(id, next)
          return res.status(200).send({
            students: updated
          })
        
      } else {
        res.status(404).send({
          errors: 'relevant resource does not exist'
        })
      }
    } catch (err) {
      next(err)
    }
  },
  
destroy: async (req, res, next) => {
        try {
         
          
            const id = req.params.id * 1
            const subjectStudents = await studentsModel.findById(id, next)
            if (subjectStudents !== undefined) {
              const deletedStudents = await studentsModel.destroy(id, next)
              if (deletedStudents !== undefined) {
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