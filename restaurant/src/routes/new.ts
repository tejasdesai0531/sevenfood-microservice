import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@sevenfood/common';
import { Outlet } from '../models/outlet';
import { Catalogue } from '../models/catalogue';
import { OutletCreatedPublisher } from '../events/publishers/outlet-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
    '/api/restaurant/outlet',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('name').not().isEmpty().withMessage('Address is required'),
        body('location.latitude').not().isEmpty().withMessage('Latitude is required'),
        body('location.latitude').not().isEmpty().withMessage('Latitude is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

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

        const catalogue = Catalogue.build({
            outletId: outlet.id
        })

        await catalogue.save()

        new OutletCreatedPublisher(natsWrapper.client).publish({
            id: outlet.id,
            userId: outlet.userId,
            name: outlet.name,
            address: outlet.address,
            location: outlet.location,
            countryCode: outlet.countryCode,
            cityCode: outlet.cityCode,
            contact: outlet.contact,
            restaurantType: outlet.restaurantType,
            cuisines: outlet.cuisines,
            timing: outlet.timing,
            workingDays: outlet.workingDays
        })

        res.status(201).send(outlet)
    }
)

export { router as createOutletRouter };