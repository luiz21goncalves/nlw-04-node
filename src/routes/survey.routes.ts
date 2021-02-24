import { Router } from 'express';

import { SurveyController } from '../controllers/SurveyController';

const surveyRouter = Router();
const surveyController = new SurveyController();

surveyRouter.post('/', surveyController.create);

export { surveyRouter };
