import { Router } from 'express';

import { AnswerController } from '../controllers/AnswerController';
import { NpsController } from '../controllers/NpsController';

const answerRouter = Router();
const answerController = new AnswerController();
const npsController = new NpsController();

answerRouter.get('/:value', answerController.execute);

answerRouter.get('/nps/:survey_id', npsController.execute);

export { answerRouter };
