import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { City } from '../models/city';
import mongoose from 'mongoose';
import { Country } from '../models/country';

import { natsWrapper } from '../nats-wrapper';
import { CityCreatedPublisher } from '../events/publishers/city-created-publisher';
import { CityUpdatedPublisher } from '../events/publishers/city-updated-publisher';

const router = express.Router();

router.post(
    '/api/admin/city',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Code is required'),
        body('countryId').not().isEmpty().custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Country Id must be provided'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { name, code, countryId, status} = req.body

        const country = await Country.findById(countryId)

        if(!country) {
            throw new NotFoundError()
        }

        const city = City.build({
            name,
            code,
            country,
            status
        })

        await city.save();

        new CityCreatedPublisher(natsWrapper.client).publish({
            id: city.id,
            name: city.name,
            code: city.code,
            status: city.status
        })

        res.status(201).send(city)
    }
)

router.patch(
    '/api/admin/city',
    requireAuth,
    [
        body('cityId').not().isEmpty().withMessage('City Id is required'),
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Code is required'),
        body('countryId').not().isEmpty().custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Country Id must be provided'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { cityId, name, code, countryId, status} = req.body

        const city = await City.findById(cityId)

        if(!city) {
            throw new NotFoundError()
        }

        const country = await Country.findById(countryId)

        if(!country) {
            throw new NotFoundError()
        }

        city.name = name
        city.code = code
        city.country = countryId
        city.status = status

        await city.save();

        new CityUpdatedPublisher(natsWrapper.client).publish({
            id: city.id,
            name: city.name,
            code: city.code,
            status: city.status
        })

        res.status(201).send(city)
    }
)

router.get(
    '/api/admin/city',
    requireAuth,
    async (req: Request, res: Response) => {

        const cityList = await City.find({}).populate('country')

        res.status(200).send(cityList)

    }
)

router.get(
    '/api/admin/city/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let city = await City.findById(req.params.id).populate('country')

        if(!city) {
            throw new NotFoundError()
        }

        res.send(city)
    }
)

export { router as cityRouter };