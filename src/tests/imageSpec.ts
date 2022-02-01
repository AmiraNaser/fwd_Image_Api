import supertest from 'supertest';
import app from '../app';
import path from 'path';
import fs from 'fs';
import resize from '../resizeDir/resize';

//test resize function 
describe('Test sharp resize functionality', () => {
    it('Image can be resized', async () => {
        //define image parameters
        const imageName = 'simba';
        const width = 200;
        const height = 200;
        const resizedImage = await resize(imageName, width, height);
        expect(resizedImage).toBeTrue();
        const thumbDir = path.join(process.cwd(), `images/thumbnails/${imageName}_w${width}_h${height}.jpg`);
        expect(fs.existsSync(thumbDir)).toBeTruthy();
    });
});