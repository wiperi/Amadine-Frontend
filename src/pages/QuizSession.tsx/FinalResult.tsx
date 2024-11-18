import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from './QuizSession';
import { catchAxiosError } from '@/utils/helpers';
import { playerGetSessionResult } from '@/apis/quiz';
import { PlayerGetSessionResultReturned } from '@/types/ApiReturnType';
import { QuestionResult } from './AnswerShow';

const FinalResult: React.FC = () => {
  const { playerId, quizId } = useContext(StateContext);

  const [results, setResults] = useState<PlayerGetSessionResultReturned | undefined>(undefined);
  useEffect(() => {
    catchAxiosError(async () => {
      const { data: results } = await playerGetSessionResult(playerId);
      setResults(results);
      console.log('results', results);
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        <h1 className="text-center text-5xl font-bold">Final Result</h1>

        {/* Top Players */}
        <h1 className="text-center text-3xl font-bold">Top Players</h1>
        <div className="mx-auto flex w-full flex-col gap-4 md:w-1/2 xl:w-1/3">
          {results?.usersRankedByScore.map((player) => (
            <div key={player.name} className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-xl font-semibold">{player.name}</span>
                <span className="text-xl font-bold">{player.score} points</span>
              </div>
            </div>
          ))}
        </div>

        {/* Question Results */}
        {results?.questionResults.map((result, index) => (
          <QuestionResult key={index} results={result} questionPosition={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default FinalResult;
