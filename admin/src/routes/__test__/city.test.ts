import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Country } from '../../models/country';
import { City } from '../../models/city';

it('creates an city with valid input', async () => {

    const token = await global.signin();

    let cities = await City.find({})
    expect(cities.length).toEqual(0);

    let countryResponse = await request(app)
        .post('/api/country')
        .set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: true
        })
        .expect(201);

    await request(app)
        .post('/api/city')
        .set({'token': token})
        .send({
            name: 'Mumbai',
            code: 'MUM',
            countryId: countryResponse.body.id,
            status: true
        })
        .expect(201);

    cities = await City.find({}).populate('country');
    expect(cities.length).toEqual(1);
    expect(cities[0].name).toEqual('Mumbai');
    expect(cities[0].code).toEqual('MUM');
    expect(cities[0].country._id).toEqual(new mongoose.Types.ObjectId(countryResponse.body.id));
    expect(cities[0].status).toEqual(true);
})

it('get list of cities', async () => {

    const token = await global.signin();

    let countryResponse = await request(app)
        .post('/api/country')
        .set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: true
        })
        .expect(201);

    await request(app)
        .post('/api/city')
        .set({'token': token})
        .send({
            name: 'Mumbai',
            code: 'MUM',
            countryId: countryResponse.body.id,
            status: true
        })
        .expect(201);

    await request(app)
        .post('/api/city')
        .set({'token': token})
        .send({
            name: 'Pune',
            code: 'PNE',
            countryId: countryResponse.body.id,
            status: true
        })
        .expect(201);

    let response = await request(app)
        .get('/api/city')
        .set({'token': token})
        .send({})

    console.log(response.body)

    expect(response.body.length).toEqual(2)
})