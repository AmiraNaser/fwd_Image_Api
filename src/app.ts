import express from 'express';
import routed from './routes/router';
const app = express();
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Processing Image API Home Page');
});
app.use('/api', routed);
export default app;