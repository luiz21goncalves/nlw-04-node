import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import { AppError } from '../errors/AppError';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
  async index(_: Request, response: Response): Promise<Response> {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepository.find();

    return response.json(surveys);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      await schema.validate({ title, description }, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }
}

export { SurveyController };
