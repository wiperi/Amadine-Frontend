import { useState, createContext, useMemo } from 'react';
import Lobby from './Lobby';
import QuestionOpen from './QuestionOpen';
import AnswerShow from './AnswerShow';
import FinalResult from './FinalResult';
import { playerGetStatusInSession, quizSessionGetStatus } from '@/apis/quiz';
import { useParams, useSearchParams } from 'react-router-dom';
import { catchAxiosError } from '@/utils/helpers';
import QuestionClose from './QuestionClose';
import { QuizSessionState as S } from '@/types/Enums';

type StateContextType = {
  state: S;
  numQuestions: number;
  atQuestion: number;
  sessionId: number;
  playerId: number;
  quizId: number;
};

export const StateContext = createContext<StateContextType>({
  state: S.LOBBY,
  numQuestions: 0,
  atQuestion: 0,
  sessionId: 0,
  playerId: 0,
  quizId: 0,
});

const QuizSession: React.FC = () => {
  const [state, setState] = useState<S>(S.LOBBY);
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [atQuestion, setAtQuestion] = useState<number>(0);

  const sessionId = parseInt(useParams().sessionId || '-1');
  const [searchParams] = useSearchParams();
  const playerId = parseInt(searchParams.get('playerId') || '-1');
  const quizId = parseInt(searchParams.get('quizId') || '-1');
  console.log('sessionId', sessionId);
  console.log('playerId', playerId);
  console.log('quizId', quizId);

  setInterval(() => {
    catchAxiosError(async () => {
      if (quizId !== -1) {
        // Admin side
        const { data: { state } } = await quizSessionGetStatus(quizId, sessionId);
        console.log(state);
        setState(state as S);
      } else {
        // Player side
        const {
          data: { state, numQuestions, atQuestion },
        } = await playerGetStatusInSession(playerId);
        console.log(state, numQuestions, atQuestion);
        setState(state as S);
      }
    });
  }, 3000);

  return (
    <StateContext.Provider value={{ state, numQuestions, atQuestion, sessionId, playerId, quizId }}>
      <div>
        {state === S.LOBBY && <Lobby />}
        {[S.QUESTION_OPEN, S.QUESTION_OPEN].includes(state) && <QuestionOpen />}
        {state === S.QUESTION_CLOSE && <QuestionClose />}
        {state === S.ANSWER_SHOW && <AnswerShow />}
        {state === S.FINAL_RESULTS && <FinalResult />}
        {state === S.END && <div>End</div>}
      </div>
    </StateContext.Provider>
  );
};

export default QuizSession;
