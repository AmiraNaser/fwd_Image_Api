import path from "path";
import { resolve } from "path/posix";
import sharp from "sharp";

//define image path variables
const extension = '.jpg';
const imageFolder = '../images/source';
const resizedFolder = '../images/thumbnails';
//Make promise function and wait for url parametres to resize image
const resize = async (imageName: string, width: number, height: number): Promise <boolean> => {
    const imagePath = path.join(process.cwd(), `images/source/${imageName}${extension}`);
    const resizedImagePath = path.join(process.cwd(), `images/thumbnails/${imageName}_w${width}_h${height}${extension}`);
    //use  Sharp to resize Image
    const sharpResized = async(): Promise <boolean> => {
      return await new Promise((resolve, reject) => {
        sharp(imagePath)
        .resize(width, height)
        .toFile(resizedImagePath, (err) => {
          if(err) {
            return resolve(false);
          }else {
            return resolve(true);
          }
        });
        // .then((err) => {
        //   if(err) {
        //     return false;
        //   }else {
        //     return true;
        //   }
        // });
      })
    }  
    return sharpResized();
}
export default resize;