import { Router } from 'express';

import decodeJWTMiddleware from '../middlewares/decodeJWT.middleware.js';
import * as messageController from './message.controller.js'

const messagePath = '/message';

const messageRouter = Router();

messageRouter.post(`${messagePath}`, decodeJWTMiddleware, messageController.sendMessage);
messageRouter.post(`${messagePath}/certificate`, decodeJWTMiddleware, messageController.sendCertificate);

export default messageRouter;
