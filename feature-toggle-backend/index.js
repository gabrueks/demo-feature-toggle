import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import verifyRouter from './verify/router.js';
import messageRouter from './message/router.js';

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use(verifyRouter);
app.use(messageRouter);

app.get('/', (_req, res) => {
    res.status(200).json({ health: 'ok' });
})

app.listen(process.env.PORT || 8080);
