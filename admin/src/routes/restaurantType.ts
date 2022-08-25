import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { RestaurantType } from '../models/restaurantType';
import { natsWrapper } from '../nats-wrapper';

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