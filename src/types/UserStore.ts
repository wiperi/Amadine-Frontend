export type Quiz = {
  quizId: number;
  name: string;
  timeCreated: number;
  timeLastEdited: number;
  description: string;
  numQuestions: number;
  questions: Array<Question>;
  duration: number;
};

export type UserInfo = {
  userId: number;
  name: string;
  email: string;
  numSuccessfulLogins: number;
  numFailedPasswordsSinceLastLogin: number;
};

export type Question = {
  questionId: number;
  question: string;
  duration: number;
  points: number;
  answers: Array<Answer>;
};

export type Answer = {
  answerId: number;
  answer: string;
  colour: string;
  correct: boolean;
};
