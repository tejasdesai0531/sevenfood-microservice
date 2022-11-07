import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { Cuisine } from '../models/cuisine';
import { natsWrapper } from '../nats-wrapper';
import { CuisineCreatedPublisher } from '../events/publishers/cuisine-created-publisher';
import { CuisineUpdatedPublisher } from '../events/publishers/cuisine-updated-publisher';

const router = express.Router();

router.post(
    '/api/admin/cuisine',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Code is required'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const cuisine = Cuisine.build({
            name: req.body.name,
            code: req.body.code,
            status: req.body.status
        })

        await cuisine.save();

        new CuisineCreatedPublisher(natsWrapper.client).publish({
            id: cuisine.id,
            name: cuisine.name,
            code: cuisine.code,
            status: cuisine.status
        })

        res.status(201).send(cuisine)
    }
)

router.patch(
    '/api/admin/cuisine',
    requireAuth,
    [
        body('cuisineId').not().isEmpty().withMessage('Cuisine Id is required'),
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Code is required'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const cuisine = await Cuisine.findById(req.body.cuisineId)

        if(!cuisine) {
            throw new NotFoundError()
        }

        cuisine.name = req.body.name
        cuisine.code = req.body.code
        cuisine.status = req.body.status

        await cuisine.save();

        new CuisineUpdatedPublisher(natsWrapper.client).publish({
            id: cuisine.id,
            name: cuisine.name,
            code: cuisine.code,
            status: cuisine.status
        })

        res.status(201).send(cuisine)
    }
)

router.get(
    '/api/admin/cuisine',
    requireAuth,
    async (req: Request, res: Response) => {

        const cuisineList = await Cuisine.find({})

        res.status(200).send(cuisineList)

    }
)

router.get(
    '/api/admin/cuisine/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let cuisine = await Cuisine.findById(req.params.id)

        if(!cuisine) {
            throw new NotFoundError()
        }

        res.send(cuisine)
    }
)

export { router as cuisineRouter };