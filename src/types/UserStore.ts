export type Quiz = {
  quizId: number;
  name: string;
  timeCreated: number;
  timeLastEdited: number;
  description: string;
  numQuestions: number;
  questions: Array<{
    questionId: number;
    question: string;
    duration: number;
    points: number;
    answers: Array<{
      answerId: number;
      answer: string;
      colour: string;
      correct: boolean;
    }>;
  }>;
  duration: number;
};

export type UserInfo = {
  userId: number;
  name: string;
  email: string;
  numSuccessfulLogins: number;
  numFailedPasswordsSinceLastLogin: number;
};

