export interface State {
  questions: QuestionModal[];
  result: number;
}

export interface QuestionModal {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
  selectedOption?: string;
  isCorrect?: boolean;
}

export interface Filters {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}