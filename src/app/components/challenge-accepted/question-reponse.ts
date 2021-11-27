import { Question } from '../../models/question';
import { Reponse } from '../../models/reponse';

export interface QuestionReponse {
  question: Question;
  reponse: Partial<Reponse>;
}
