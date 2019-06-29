const classesRoutes = require('express').Router()
import classesController from '../../controllers/classesController'
import studentclasses from './studentclasses'
classesRoutes.get('/', classesController.list)

classesRoutes.get('/:id', classesController.show)

classesRoutes.post('/', classesController.create)

classesRoutes.put('/:id', classesController.update)

classesRoutes.delete('/:id', classesController.destroy)

classesRoutes.use(
    '/:class_id/students',
    (req, res, next) => {
      
      req.class_id = req.params.class_id
      next()
    },
    studentclasses
  )

export default classesRoutes
