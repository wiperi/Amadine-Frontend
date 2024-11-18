import { useContext, useEffect, useState } from 'react';
import { PlayerList } from './PlayerList';
import { StateContext } from './QuizSession';
import { catchAxiosError } from '@/utils/helpers';
import { playerGetQuestionResult } from '@/apis/quiz';
import { PlayerGetQuestionResultReturned } from '@/types/ApiReturnType';

const AnswerShow: React.FC = () => {
  const { playerId, atQuestion } = useContext(StateContext);

  const [results, setResults] = useState<PlayerGetQuestionResultReturned | undefined>(undefined);

  useEffect(() => {
    catchAxiosError(async () => {
      const { data: results } = await playerGetQuestionResult(playerId, atQuestion);
      setResults(results);
      console.log('results', results);
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        <h1 className="text-center text-5xl font-bold">Question {atQuestion + 1}</h1>

        <div className="flex gap-4">
          <div className="flex-1 rounded-lg bg-slate-700 p-4">
            <h2 className="text-2xl font-bold">Average answer time</h2>
            <p className="text-4xl font-bold">{results?.averageAnswerTime}s</p>
          </div>
          <div className="flex-1 rounded-lg bg-slate-700 p-4">
            <h2 className="text-2xl font-bold">Percentage of correct answers</h2>
            <p className="text-4xl font-bold">{results?.percentCorrect}%</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold">Correct Players</h1>
        <PlayerList players={results?.playersCorrectList ?? []} />
      </div>
    </div>
  );
};

export const QuestionResult: React.FC<{
  results: PlayerGetQuestionResultReturned;
  questionPosition: number;
}> = ({ results, questionPosition }) => {
  return (
    <div className="flex flex-col justify-center gap-8 p-8">
      <h1 className="text-center text-5xl font-bold">Question {questionPosition}</h1>

      <div className="flex gap-4">
        <div className="flex-1 rounded-lg bg-slate-700 p-4">
          <h2 className="text-2xl font-bold">Average answer time</h2>
          <p className="text-4xl font-bold">{results?.averageAnswerTime}s</p>
        </div>
        <div className="flex-1 rounded-lg bg-slate-700 p-4">
          <h2 className="text-2xl font-bold">Percentage of correct answers</h2>
          <p className="text-4xl font-bold">{results?.percentCorrect}%</p>
        </div>
      </div>

      <h1 className="text-3xl font-bold">Correct Players</h1>
      <PlayerList players={results?.playersCorrectList ?? []} />
    </div>
  );
};

export default AnswerShow;
