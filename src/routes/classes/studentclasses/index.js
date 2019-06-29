const studentclassesRoutes = require('express').Router()
import studentclassesController from '../../../controllers/studentclassesController'

studentclassesRoutes.get('/', studentclassesController.list)



studentclassesRoutes.post('/', studentclassesController.create)



studentclassesRoutes.delete('/:id', studentclassesController.destroy)

export default studentclassesRoutes
