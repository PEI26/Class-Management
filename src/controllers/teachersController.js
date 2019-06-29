import teachersModel from '../models/teachers'


export default {
    list: async (req, res, next) => {
        try {
          const teachers = await teachersModel.findAll(req, next)
          res.status(200).json({
            teachers: teachers
          })
        } catch (err) {
          next(err)
        }
      },
      show: async (req, res, next) => {
        try {
          const teachersId = req.params.id * 1
    
          const requestTeachers = await teachersModel.findById(teachersId, next)
          if (requestTeachers !== undefined) {
            return res.send(requestTeachers)
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
         
            const teachers = {
              ...req.body
            }
            console.log(teachers)
            const teacher = await teachersModel.create(teachers, next)
            
            const created = await teachersModel.findById(await teacher, next)
            return res.status(200).send({
              teachers: created
            })
          
        } catch (err) {
          // next(err)
          console.log(err)
        }
      },
  
    update: async (req, res, next) => {
        try {
          const id = req.params.id * 1
          const updateTeachers = await teachersModel.findById(id, next)
          if (updateTeachers !== null) {
             
              const teachersParams = {
                ...req.body
              }
              if (Object.keys(teachersParams).length === 0) {
                res.status(200).send({
                  error: 'No data to update'
                })
              }
              await teachersModel.update(id, teachersParams, next)
              const updated = await teachersModel.findById(id, next)
              return res.status(200).send({
                teachers: updated
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
            const subjectTeachers = await teachersModel.findById(id, next)
            if (subjectTeachers !== undefined) {
              const deletedTeachers = await teachersModel.destroy(id, next)
              if (deletedTeachers !== undefined) {
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