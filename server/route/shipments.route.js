import { Router } from 'express'
import { createShipmentsController,addHopsToRouteController } from '../controllers/shipments.controller.js'

const shipmentsRouter = Router()

shipmentsRouter.post('/create',createShipmentsController)
shipmentsRouter.post('/:shipment_number/hops/add',addHopsToRouteController)






export default shipmentsRouter