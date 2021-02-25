import { Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysusersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SendMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(400).json({
        message: 'User does not exists!',
      });
    }

    const survey = await surveysRepository.findOne(
      {
        where: {
          id: survey_id,
        },
      },
    );

    if (!survey) {
      return response.status(400).json({
        message: 'Survey does not exists!',
      });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    });

    await surveysUsersRepository.save(surveyUser);

    return response.status(201).json(surveyUser);
  }
}

export { SendMailController };
