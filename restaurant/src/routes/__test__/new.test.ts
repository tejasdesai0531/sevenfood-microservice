import request from 'supertest';
import { app } from '../../app';
import { Outlet } from '../../models/outlet';
import { Catalogue } from '../../models/catalogue';

it('creates an outlet with valid input', async () => {

    const token = await global.signin();

    let outlets = await Outlet.find({})
    expect(outlets.length).toEqual(0);

    await request(app)
        .post('/api/restaurant/outlet')
        .set({'token': token})
        .send({
            name: 'Lash ka Dhaba',
            address: 'Kailash Nagar',
            location: {
                latitude: 34,
                longitude: 34
            },
            countryCode: "IND",
            cityCode: "MUM",
            contact: "3434343434",
            restaurantType: ['desert'],
            cuisines: ['North Indian'],
            timing: {
                startsAt: new Date(),
                closesAt: new Date()
            },
            workingDays: ["SON", "MON", "TUE"]
        })

    outlets = await Outlet.find({});
    console.log(outlets)
    expect(outlets.length).toEqual(1);

    await request(app)
        .post('/api/restaurant/category')
        .set({'token': token})
        .send({
            name: 'Pizza',
            outletId: outlets[0].id
        })
    
    let catalogues = await Catalogue.find({})
    console.log("CCC : ", catalogues[0].categories)
    expect(catalogues.length).toEqual(1)

    await request(app)
        .post('/api/restaurant/subcategory')
        .set({'token': token})
        .send({
            name: 'Pizza',
            categoryId: catalogues[0].categories![0].id,
            outletId: outlets[0].id
        })
    
    catalogues = await Catalogue.find({})
    console.log("DDD : ", catalogues[0].categories![0])
    expect(catalogues.length).toEqual(1)

    await request(app)
        .post('/api/restaurant/item')
        .set({'token': token})
        .send({
            name: 'Tomato Pizza',
            price: 44,
            categoryId: catalogues[0].categories![0].id,
            subcategoryId: catalogues[0].categories![0].subcategories![0].id,
            outletId: outlets[0].id
        })
    
    catalogues = await Catalogue.find({})
    console.log("EEE : ", catalogues[0].categories![0].subcategories![0])
    expect(catalogues.length).toEqual(1)
})