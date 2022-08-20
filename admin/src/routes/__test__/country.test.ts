import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Country } from '../../models/country';

it('has a route handler listening to /api/country for post requests', async () => {
    const response = await request(app).post('/api/country').send({});
  
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/country').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {

    const token = await global.signin();

    const response = await request(app)
      .post('/api/tickets')
      .set({'token': token})
      .send({});
  
    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid name, code and status is provided', async () => {

    const token = await global.signin();

    await request(app).post('/api/country').set({'token': token})
        .send({
            name: '',
            code: 'IND',
            status: 1
        }).expect(400);
  
    await request(app).post('/api/country').set({'token': token})
        .send({
            code: 'IND',
            status: 1
        }).expect(400);
    await request(app).post('/api/country').set({'token': token})
        .send({
            name: 'India',
            code: '',
            status: 1
        }).expect(400);
    await request(app).post('/api/country').set({'token': token})
        .send({
            name: 'India',
            status: 1
        }).expect(400);
    await request(app).post('/api/country').set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: "dfd"
        }).expect(400);
    await request(app).post('/api/country').set({'token': token})
        .send({
            name: 'India',
            code: 'IND'
        }).expect(400);
    
});

it('creates an country with valid input', async () => {

    const token = await global.signin();

    let countries = await Country.find({})
    expect(countries.length).toEqual(0);

    await request(app)
        .post('/api/country')
        .set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: true
        })
        .expect(201);

    countries = await Country.find({});
    console.log(countries)
    expect(countries.length).toEqual(1);
    expect(countries[0].name).toEqual('India');
    expect(countries[0].code).toEqual('IND');
    expect(countries[0].status).toEqual(true);
})

it('get list of countries', async () => {

    const token = await global.signin();

    let countries = await Country.find({})
    expect(countries.length).toEqual(0);

    await request(app)
        .post('/api/country')
        .set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: true
        })
        .expect(201);
    
    await request(app)
        .post('/api/country')
        .set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: true
        })
        .expect(201);

    let response = await request(app)
        .get('/api/country')
        .set({'token': token})
        .send({})

    expect(response.body.length).toEqual(2)
})

it('returns a 404 if the country is not found', async () => {

    const token = await global.signin();

    const id = new mongoose.Types.ObjectId().toHexString();
  
    await request(app).get(`/api/country/${id}`).set({'token': token}).send().expect(404);
});

it('returns a country if found', async () => {
    const token = await global.signin();

    let response = await request(app)
        .post('/api/country')
        .set({'token': token})
        .send({
            name: 'India',
            code: 'IND',
            status: true
        })
        .expect(201);

    let countryResponse = await request(app)
                                .get(`/api/country/${response.body.id}`)
                                .set({'token': token})
                                .send()
                                .expect(200);

    expect(countryResponse.body.name).toEqual('India')
    expect(countryResponse.body.code).toEqual('IND')
    expect(countryResponse.body.status).toEqual(true)
})