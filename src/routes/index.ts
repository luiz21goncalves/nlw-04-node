import { Router } from 'express';

import { answerRouter } from './answer.routes';
import { sendMailRouter } from './sendMail.routes';
import { surveyRouter } from './survey.routes';
import { userRouter } from './user.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/surveys', surveyRouter);
routes.use('/sendMail', sendMailRouter);
routes.use('/answers', answerRouter);

export { routes };
