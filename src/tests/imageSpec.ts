import supertest from 'supertest';
import app from '../app';
import path from 'path';
import fs from 'fs';
import resize from '../resizeDir/resize';
// test resized image
describe('Image can be resized', () => {
    it('Image resizing should work', async() => {
        const resizePath = await resize("tom", 200, 200);
        expect(resizePath).toBeTrue();

        expect(resizePath).toEqual(
            expect(resizePath).toMatch(/tom_w200_h200.jpg$/)
          );
    });
})