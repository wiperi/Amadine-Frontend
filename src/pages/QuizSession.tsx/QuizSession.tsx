import { useState, createContext, useMemo, useEffect } from 'react';
import Lobby from './Lobby';
import QuestionOpen from './QuestionOpen';
import AnswerShow from './AnswerShow';
import FinalResult from './FinalResult';
import { playerGetQuestionInfo, playerGetStatusInSession, quizSessionGetStatus } from '@/apis/quiz';
import { useParams, useSearchParams } from 'react-router-dom';
import { catchAxiosError } from '@/utils/helpers';
import QuestionClose from './QuestionClose';
import { QuizSessionState as S } from '@/types/Enums';
import { PlayerGetQuestionInfoReturned } from '@/types/ApiReturnType';

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
  console.log('QuizSession loaded');
  const [state, setState] = useState<S>(S.LOBBY);
  const value = useMemo(() => ({ state, setState }), [state]);
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [atQuestion, setAtQuestion] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [question, setQuestion] = useState<PlayerGetQuestionInfoReturned>();
  const sessionId = parseInt(useParams().sessionId || '-1');
  const [searchParams] = useSearchParams();
  const playerId = parseInt(searchParams.get('playerId') || '-1');
  const quizId = parseInt(searchParams.get('quizId') || '-1');
  const autoStartNum = parseInt(searchParams.get('autoStartNum') || '-1');

  const fetchStatus = async () => {
    await catchAxiosError(async () => {
      // Player side
      const {
        data: { state: newState, numQuestions: newNumQuestions, atQuestion: newAtQuestion },
      } = await playerGetStatusInSession(playerId);
      
      if (newState !== state && newState === S.QUESTION_COUNTDOWN) {
        console.log('fetchQuestionInfo');
      }
      
      if (newState !== state) {
        console.log(`${state} -> ${newState}`);
        setState(newState);
      }
      if (newNumQuestions !== numQuestions) {
        setNumQuestions(newNumQuestions);
      }
      if (newAtQuestion !== atQuestion) {
        setAtQuestion(newAtQuestion);
      }

      // fetchQuestionInfo();
    });
  };

  const fetchQuestionInfo = async () => {
    console.log('fetchQuestionInfo');
    await catchAxiosError(async () => {
      const { data: question } = await playerGetQuestionInfo(playerId, atQuestion);
      setQuestion(question);
      console.log('question', question);
    });
  };

  useEffect(() => {
    console.log('useEffect');

    const intervalId = setInterval(fetchStatus, 2000);
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
        {state === S.END && (
          <div className="flex h-screen items-center justify-center text-center text-5xl font-bold">
            End
          </div>
        )}
      </div>
    </StateContext.Provider>
  );
};

export default QuizSession;
