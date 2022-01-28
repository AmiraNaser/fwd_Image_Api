import { appendFile } from "fs";
import app from "./app";
const port:number = 8000;
app.listen(port, () : void => {
    console.log(`Server running at http://localhost:${port}`);
    
});