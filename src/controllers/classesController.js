import classesModel from '../models/classes'


export default {
  list: async (req, res, next) => {
    try {
      const classes = await classesModel.findAll(req, next)
      res.status(200).json({
        classes: classes
      })
    } catch (err) {
      next(err)
    }
  },
  show: async (req, res, next) => {
    try {
      const classesId = req.params.id * 1

      const requestClasses = await classesModel.findById(classesId, next)
      if (requestClasses !== undefined) {
        return res.send(requestClasses)
      } else {
        return res.status(404).end()
      }
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
     
        const classes = {
          ...req.body
        }
        console.log(classes)
        const classeses = await classesModel.create(classes, next)
        
        const created = await classesModel.findById(await classeses, next)
        return res.status(200).send({
          classes: created
        })
      
    } catch (err) {
      // next(err)
      console.log(err)
    }
  },
update: async (req, res, next) => {
try {
  const id = req.params.id * 1
  const updateClasses = await classesModel.findById(id, next)
  if (updateClasses !== null) {
     
      const classesParams = {
        ...req.body
      }
      if (Object.keys(classesParams).length === 0) {
        res.status(200).send({
          error: 'No data to update'
        })
      }
      await classesModel.update(id, classesParams, next)
      const updated = await classesModel.findById(id, next)
      return res.status(200).send({
        classes: updated
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
        const subjectClasses = await classesModel.findById(id, next)
        if (subjectClasses !== undefined) {
          const deletedClasses = await classesModel.destroy(id, next)
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

