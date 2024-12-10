import { useState, createContext, useMemo, useEffect } from 'react';
import QuestionOpen from './QuestionOpen';
import AnswerShow from './AnswerShow';
import FinalResult from './FinalResult';
import { playerGetStatusInSession } from '@/apis/quiz';
import { useSearchParams } from 'react-router-dom';
import { catchAxiosError } from '@/utils/helpers';
import QuestionClose from './QuestionClose';
import { QuizSessionState as S } from '@/types/Enums';
import { PlayerGetQuestionInfoReturned } from '@/types/ApiReturnType';

type StateContextType = {
  state: S;
  numQuestions: number;
  atQuestion: number;
  playerId: number;
  question: PlayerGetQuestionInfoReturned | undefined;
};

export const StateContext = createContext<StateContextType>({
  state: S.LOBBY,
  numQuestions: -1,
  atQuestion: -1,
  playerId: -1,
  question: undefined,
});

const PlayerLobby: React.FC = () => {
  console.log('QuizSession loaded');
  const [searchParams] = useSearchParams();

  // Cache context value using useMemo, avoiding unnecessary re-renders of every sub-component
  let con = useMemo(
    () => ({
      state: S.LOBBY,
      numQuestions: 0,
      atQuestion: 0,
      playerId: parseInt(searchParams.get('playerId') || '-1'),
      question: undefined,
    }),
    []
  );

  const [state, setState] = useState<S>(con.state);

  const fetchStatus = async () => {
    await catchAxiosError(async () => {
      // Player side
      const {
        data: { state: newState, numQuestions: newNumQuestions, atQuestion: newAtQuestion },
      } = await playerGetStatusInSession(con.playerId);

      if (newState !== con.state) {
        console.log(`${con.state} -> ${newState}`);
        con.state = newState;
        setState(newState);
      }
      if (newNumQuestions !== con.numQuestions) {
        con.numQuestions = newNumQuestions;
      }
      if (newAtQuestion !== con.atQuestion) {
        con.atQuestion = newAtQuestion;
      }
    });
  };

  useEffect(() => {
    console.log('useEffect');

    const intervalId = setInterval(fetchStatus, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StateContext.Provider value={con}>
      <div className="min-h-screen w-full bg-slate-800 text-white">
        {con.state === S.LOBBY && (
          <h1 className="absolute inset-0 flex items-center justify-center text-center text-5xl font-bold">
            Waiting for game to start...
          </h1>
        )}
        {(con.state === S.QUESTION_OPEN || con.state === S.QUESTION_COUNTDOWN) && <QuestionOpen />}
        {con.state === S.QUESTION_CLOSE && <QuestionClose />}
        {con.state === S.ANSWER_SHOW && <AnswerShow />}
        {con.state === S.FINAL_RESULTS && <FinalResult />}
        {con.state === S.END && (
          <div className="flex h-screen items-center justify-center text-center text-5xl font-bold">
            Game Ended
          </div>
        )}
      </div>
    </StateContext.Provider>
  );
};

export default PlayerLobby;
