import { Repository } from 'typeorm';

import { ICreateSurveyDTO } from '../dtos/ICreateSurveyDTO';
import { Surveys } from '../entities/Surveys';

class CreateSurveyService {
  constructor(
    private surveysRepository: Repository<Surveys>,
  ) {}

  async execute({ title, description }: ICreateSurveyDTO): Promise<Surveys> {
    const survey = this.surveysRepository.create({
      title,
      description,
    });

    await this.surveysRepository.save(survey);

    return survey;
  }
}

export { CreateSurveyService };
