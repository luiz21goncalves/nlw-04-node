import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository copy';
import { CreateSurveyService } from '../services/CreateSurveyService';

class SurveyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    try {
      const createSurvey = new CreateSurveyService(surveysRepository);

      const survey = await createSurvey.execute({
        title,
        description,
      });

      return response.status(201).json(survey);
    } catch (error) {
      return response.status(400).json({
        message: error.message ?? 'Unexpected error',
      });
    }
  }
}

export { SurveyController };
