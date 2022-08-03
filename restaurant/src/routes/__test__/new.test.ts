import request from 'supertest';
import { app } from '../../app';
import { Outlet } from '../../models/outlet';

it('creates an outlet with valid input', async () => {

    const token = await global.signin();

    let outlets = await Outlet.find({})
    expect(outlets.length).toEqual(0);

    await request(app)
        .post('/api/outlet')
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
})