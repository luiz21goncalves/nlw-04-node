import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import * as yup from 'yup';

import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysusersRepository';

class NpsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { survey_id } = request.params;

    const schema = yup.object().shape({
      survey_id: yup.string().uuid().required(),
    });

    try {
      await schema.validate({ survey_id }, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      where: { survey_id, value: Not(IsNull()) },
    });

    const totalAnswers = surveysUsers.length;

    const detractors = surveysUsers.filter(
      (item) => item.value >= 0 && item.value <= 6,
    ).length;

    const promotors = surveysUsers.filter(
      (item) => item.value >= 9 && item.value <= 10,
    ).length;

    const passives = surveysUsers.filter(
      (item) => item.value >= 0 && item.value <= 8,
    ).length;

    const calculate = ((promotors - detractors) / totalAnswers) * 100;

    return response.json({
      totalAnswers,
      detractors,
      promotors,
      passives,
      nps: Number(calculate.toFixed(2)),
    });
  }
}

export { NpsController };
