import { Router } from 'express';

import * as verifyController from './verify.controller.js';

const verifyPath = '/verify';

const verifyRouter = Router();

verifyRouter.post(`${verifyPath}`, verifyController.getCodeController);
verifyRouter.post(`${verifyPath}/check`, verifyController.checkCodeController);

export default verifyRouter;