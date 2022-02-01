import supertest from 'supertest';
import app from '../app';
//test endpoint
const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200); 
    });

    it('Image resize work', async () => {
        const response = await request.get('/api/simba?width=200&height=200');
        expect(response.status).toBe(200);
         
    });
    });