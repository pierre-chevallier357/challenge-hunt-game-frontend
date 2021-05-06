import { Question } from '../interface/question';
import { Reponse } from '../interface/reponse';

export interface QuestionReponse {
  question: Question;
  reponse: Partial<Reponse>;
}
