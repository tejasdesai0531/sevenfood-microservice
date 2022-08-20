import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { Country } from '../models/country';

const router = express.Router();

router.post(
    '/api/admin/country',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('code').not().isEmpty().withMessage('Address is required'),
        body('status').not().isEmpty().isBoolean().withMessage('Status is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const country = Country.build({
            name: req.body.name,
            code: req.body.code,
            status: req.body.status
        })

        await country.save();

        res.status(201).send(country)
    }
)

router.get(
    '/api/admin/country',
    requireAuth,
    async (req: Request, res: Response) => {

        const countryList = await Country.find({})

        res.status(200).send(countryList)

    }
)

router.get(
    '/api/admin/country/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let country = await Country.findById(req.params.id)

        if(!country) {
            throw new NotFoundError()
        }

        res.send(country)
    }
)

export { router as countryRouter };