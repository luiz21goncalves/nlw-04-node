import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysusersRepository';

class AnswerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { value } = request.params;
    const id = request.query.u;

    const schema = yup.object().shape({
      value: yup.string().required(),
      id: yup.string().uuid().required(),
    });

    try {
      await schema.validate({ value, id }, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne(String(id), { relations: ['user', 'survey'] });

    if (!surveyUser) {
      throw new AppError('SurveyUser  does not exists!');
    }

    Object.assign(surveyUser, { value: Number(value) });

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
