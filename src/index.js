import 'dotenv/config';
import express from "express";

const app = express();
const port = Number(process.env.PORT);

app.listen(port, () => console.log(`Listening on port ${port}`));
