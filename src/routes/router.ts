import express, { query } from 'express';
import path from 'path';
import fs from 'fs';
import resize from '../resizeDir/resize';

// define the endpoint
const router = express.Router();
router.get('/:imageName',async(req: express.Request, res: express.Response):Promise <Response|void|Record<string, any>> => {
    //define image name parameter and check if the user provide it correctly
    if (!req.params.imageName) {
        res.status(400).send("You Haven't Provided Valid Image Name");
    }

    console.log(req.params.imageName);
    console.log(typeof(req.params.imageName));
    // define the URL width & height  parameters
    const {width, height} = req.query;
    console.log(width, height);
    console.log(typeof(width));
    if ((typeof width === "string" && isNaN(parseInt(width, 10))) || (typeof height === "string" && isNaN(parseInt(height, 10)))) {
        console.log("Invalid width & height");  
        return res.status(400).send('Invalid width & height');
      }
    
    const dir = '../images/thumbnails';
    //define source image and resized image paths
    const imagePath = path.join(process.cwd(), `images/source/${req.params.imageName}.jpg`);
    const resizedImagePath = path.join(process.cwd(), `images/thumbnails/${req.params.imageName}_w${width}_h${height}.jpg`);
    // !fs.existsSync(dir) && fs.mkdirSync(dir);

    // Check if provided image exist in source directory
    if(!fs.existsSync(imagePath)) {
        return res.status(400).send('Image does not exist');
        console.log("image dose not exist");
        
    }
    // Check if image was resized with same width and height before
    if(fs.existsSync(resizedImagePath)) {
        console.log("return resized image");
        return res.sendFile(resizedImagePath);
        
    }
    //check if url has width and height
    if (!width || !height) {
        console.log("return source image path"); 
        return res.sendFile(imagePath);
        
    }
  
    //import  useResize function to resize images and create new resized image path
    const useResize = await resize(<string>req.params.imageName, +width, +height)
    if(useResize) {
        console.log("successful!");
        return  res.status(200).sendFile(resizedImagePath);
        
        
    }else {
        console.log("can not resize");
        return res.status(404).send("Could not resize Image")
        
        
    }
});
export default router;