import { Router } from 'express';

import { sendMailRouter } from './sendMail.routes';
import { surveyRouter } from './survey.routes';
import { userRouter } from './user.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/surveys', surveyRouter);
routes.use('/sendMail', sendMailRouter);

export { routes };
