import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest } from '@sevenfood/common';
import { Catalogue } from '../models/catalogue';
import { Outlet } from '../models/outlet';
import { ItemCreatedPublisher } from '../events/publishers/item-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Item } from '../models/item';

const router = express.Router();

router.post(
    '/api/restaurant/category',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('outletId').not().isEmpty().withMessage('Outlet Id is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const outlet = await Outlet.findById(req.body.outletId)
        if(!outlet) throw new NotFoundError()

        let catalogue = await Catalogue.findOne({outletId: outlet.id})
        if(!catalogue) throw new NotFoundError()

        catalogue.categories?.push({
            name: req.body.name
        })

        await catalogue.save();

        res.status(201).send(catalogue)
    }
)

router.post(
    '/api/restaurant/subcategory',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('categoryId').not().isEmpty().withMessage('Category Id is required'),
        body('outletId').not().isEmpty().withMessage('Outlet Id is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const outlet = await Outlet.findById(req.body.outletId)
        if(!outlet) throw new NotFoundError()

        let catalogue = await Catalogue.findOne({outletId: outlet.id})
        if(!catalogue) throw new NotFoundError()

        let category = catalogue.categories?.find(c => c.id === req.body.categoryId)

        if(!category) throw new NotFoundError()

        category.subcategories?.push({
            name: req.body.name
        })

        await catalogue.save();

        res.status(201).send(catalogue)
    }
)

router.post(
    '/api/restaurant/item',
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('price').not().isEmpty().withMessage('Price is required'),
        body('categoryId').not().isEmpty().withMessage('Category Id is required'),
        body('subcategoryId').not().isEmpty().withMessage('Sub Category Id is required'),
        body('outletId').not().isEmpty().withMessage('Outlet Id is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const outlet = await Outlet.findById(req.body.outletId)
        if(!outlet) throw new NotFoundError()

        let catalogue = await Catalogue.findOne({outletId: outlet.id})
        if(!catalogue) throw new NotFoundError()

        let category = catalogue.categories?.find(c => c.id === req.body.categoryId)
        if(!category) throw new NotFoundError()

        let subCategory = category.subcategories?.find(sc => sc.id === req.body.subcategoryId)
        if(!subCategory) throw new NotFoundError()

        let item = Item.build({
            name: req.body.name,
            price: req.body.price
        })

        const itemSaved = await item.save()

        subCategory.items?.push(itemSaved.id)

        await catalogue.save();

        new ItemCreatedPublisher(natsWrapper.client).publish({
            id: itemSaved.id,
            name: itemSaved.name,
            price: itemSaved.price,
            categoryId: category.id!,
            categoryName: category.name,
            subcategoryId: subCategory.id!,
            subCategoryName: subCategory.name,
            outletId: outlet.id
        })

        res.status(201).send(catalogue)
    }
)

export { router as catalogueRouter };
