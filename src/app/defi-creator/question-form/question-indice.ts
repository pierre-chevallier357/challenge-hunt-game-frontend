import { Indice } from 'src/app/interface/indice';
import { Question } from 'src/app/interface/question';

export interface QuestionIndice {
  question: Partial<Question>;
  indice: Partial<Indice>;
}
