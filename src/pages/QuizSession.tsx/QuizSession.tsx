import { useState, createContext, useMemo, useEffect } from 'react';
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
  autoStartNum: number;
  players: string[];
};

export const StateContext = createContext<StateContextType>({
  state: S.LOBBY,
  numQuestions: -1,
  atQuestion: -1,
  sessionId: -1,
  playerId: -1,
  quizId: -1,
  autoStartNum: -1,
  players: [],
});

const QuizSession: React.FC = () => {
  const [state, setState] = useState<S>(S.LOBBY);
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [atQuestion, setAtQuestion] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);

  const sessionId = parseInt(useParams().sessionId || '-1');
  const [searchParams] = useSearchParams();
  const playerId = parseInt(searchParams.get('playerId') || '-1');
  const quizId = parseInt(searchParams.get('quizId') || '-1');
  const autoStartNum = parseInt(searchParams.get('autoStartNum') || '-1');

  useEffect(() => {
    console.log('useEffect');
    const fetchStatus = async () => {
      await catchAxiosError(async () => {
        if (quizId !== -1) {
          // Admin side
          const {
            data: { state: newState, players: newPlayers },
          } = await quizSessionGetStatus(quizId, sessionId);
          console.log('newState', newState);
          if (newState !== state) {
            setState(newState as S);
          }
          if (newPlayers !== players) {
            setPlayers(newPlayers);
          }
        } else {
          // Player side
          const {
            data: { state: newState, numQuestions: newNumQuestions, atQuestion: newAtQuestion },
          } = await playerGetStatusInSession(playerId);
          console.log('newState', newState);

          if (newState !== state) {
            setState(newState as S);
          }
          if (newNumQuestions !== numQuestions) {
            setNumQuestions(newNumQuestions);
          }
          if (newAtQuestion !== atQuestion) {
            setAtQuestion(newAtQuestion);
          }
        }
      });
    };

    const intervalId = setInterval(fetchStatus, 1500);
    return () => clearInterval(intervalId);
  }, []);

  // Cache context value using useMemo, avoiding unnecessary re-renders of every sub-component
  const contextValue = useMemo(
    () => ({
      state,
      numQuestions,
      atQuestion,
      sessionId,
      playerId,
      quizId,
      autoStartNum,
      players,
    }),
    [state, numQuestions, atQuestion, sessionId, playerId, quizId, autoStartNum, players]
  );

  return (
    <StateContext.Provider value={contextValue}>
      <div className="min-h-screen w-full bg-slate-800 text-white">
        {state === S.LOBBY && <Lobby />}
        {(state === S.QUESTION_OPEN || state === S.QUESTION_COUNTDOWN) && <QuestionOpen />}
        {state === S.QUESTION_CLOSE && <QuestionClose />}
        {state === S.ANSWER_SHOW && <AnswerShow />}
        {state === S.FINAL_RESULTS && <FinalResult />}
        {state === S.END && <div className="h-screen flex justify-center items-center text-center text-5xl font-bold">End</div>}
      </div>
    </StateContext.Provider>
  );
};

export default QuizSession;
