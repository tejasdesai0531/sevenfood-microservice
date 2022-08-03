import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@sevenfood/common';
import { Outlet } from '../models/outlet';

const router = express.Router();

router.post(
    '/api/outlet',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('name').not().isEmpty().withMessage('Address is required'),
        body('location.latitude').not().isEmpty().withMessage('Latitude is required'),
        body('location.latitude').not().isEmpty().withMessage('Latitude is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        console.log(req.body)

        const outlet = Outlet.build({
            userId: req.currentUser!.id,
            name: req.body.name,
            address: req.body.address,
            location: req.body.location,
            countryCode: req.body.countryCode,
            cityCode: req.body.cityCode,
            contact: req.body.contact,
            restaurantType: req.body.restaurantType,
            cuisines: req.body.cuisines,
            timing: req.body.timing,
            workingDays: req.body.workingDays
        })

        await outlet.save();

        res.status(201).send(outlet)
    }
)

export { router as createOutletRouter };