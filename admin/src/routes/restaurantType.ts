import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { RestaurantType } from '../models/restaurantType';
import { natsWrapper } from '../nats-wrapper';
import { RestaurantTypeCreatedPublisher } from '../events/publishers/restaurant-type-created-publisher';
import { RestaurantTypeUpdatedPublisher } from '../events/publishers/restaurant-type-updated-publisher';

const router = express.Router();

router.post(
    '/api/admin/restaurantType',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Code is required'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const restaurantType = RestaurantType.build({
            name: req.body.name,
            code: req.body.code,
            status: req.body.status
        })

        await restaurantType.save();

        new RestaurantTypeCreatedPublisher(natsWrapper.client).publish({
            id: restaurantType.id,
            name: restaurantType.name,
            code: restaurantType.code,
            status: restaurantType.status
        })

        res.status(201).send(restaurantType)
    }
)

router.patch(
    '/api/admin/restaurantType',
    requireAuth,
    [
        body('restaurantTypeId').not().isEmpty().withMessage('Restaurant Type Id is required'),
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Code is required'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const restaurantType = await RestaurantType.findById(req.body.restaurantTypeId)

        if(!restaurantType) {
            throw new NotFoundError()
        }

        restaurantType.name = req.body.name
        restaurantType.code = req.body.Code
        restaurantType.status = req.body.status

        await restaurantType.save();

        new RestaurantTypeUpdatedPublisher(natsWrapper.client).publish({
            id: restaurantType.id,
            name: restaurantType.name,
            code: restaurantType.code,
            status: restaurantType.status
        })

        res.status(201).send(restaurantType)
    }
)

router.get(
    '/api/admin/restaurantType',
    requireAuth,
    async (req: Request, res: Response) => {

        const restaurantTypeList = await RestaurantType.find({})

        res.status(200).send(restaurantTypeList)

    }
)

router.get(
    '/api/admin/restaurantType/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let restaurantType = await RestaurantType.findById(req.params.id)

        if(!restaurantType) {
            throw new NotFoundError()
        }

        res.send(restaurantType)
    }
)

export { router as restaurantTypeRouter };