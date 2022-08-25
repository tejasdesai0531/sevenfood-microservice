import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { City } from '../models/city';
import mongoose from 'mongoose';
import { Country } from '../models/country';

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