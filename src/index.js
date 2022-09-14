import 'dotenv/config';
import express from "express";

import routes from './routes';

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
