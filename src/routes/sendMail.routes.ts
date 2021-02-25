import { Router } from 'express';

import { SendMailController } from '../controllers/SendMailController';

const sendMailRouter = Router();
const sendMailController = new SendMailController();

sendMailRouter.post('/', sendMailController.execute);

export { sendMailRouter };
