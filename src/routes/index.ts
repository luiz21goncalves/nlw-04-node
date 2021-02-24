import { Router } from 'express';

import { surveyRouter } from './survey.routes';
import { userRouter } from './user.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/surveys', surveyRouter);

export { routes };
