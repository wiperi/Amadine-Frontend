import '@/styles/global.css';
import { Avatar, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { StateContext } from './QuizSession';
import ControlBar from './ControlBar';
import { catchAxiosError } from '@/utils/helpers';
import { quizSessionUpdateState } from '@/apis/quiz';
import { PlayerAction as A } from '@/types/Enums';

const Lobby: React.FC = () => {
  const { sessionId, quizId, autoStartNum, players } = useContext(StateContext);
  const [countdown, setCountdown] = useState<number>(-1);
  const isAdmin = quizId !== -1;

  const onStartGame = () => {
    // Display a huge countdown on the middle of the screen
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          console.log('Starting game');
          catchAxiosError(async () => {
            await quizSessionUpdateState(quizId, sessionId, A.NEXT_QUESTION);
          });
          return -1;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      {/* Countdown */}
      {countdown >= 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-slate-400 text-9xl opacity-50">
            {countdown}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 p-8">
        {/* Control Bar */}
        {isAdmin && <ControlBar onStartGame={onStartGame} />}

        {/* Information Panel */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
          <h1 className="text-2xl font-bold">Quiz Name</h1>
          <p
            className="flex-1 cursor-pointer text-gray-300 hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(String(sessionId));
              message.success('Copied to clipboard');
            }}
          >
            Session ID: {sessionId} <CopyOutlined />
          </p>
          <p className="text-gray-300">{players.length}/{autoStartNum} to Start</p>
        </div>

        <h1 className="text-3xl font-bold">Players</h1>

        <PlayerList players={players} />
      </div>
    </div>
  );
};

export const PlayerList: React.FC<{ players: string[] }> = ({ players }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {players.map((player) => (
        <div
          key={player}
          className="flex h-32 items-center justify-center gap-4 rounded-lg bg-slate-700"
        >
          <Avatar
            size="large"
            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${player}`}
          />
          Player {player}
        </div>
      ))}
    </div>
  );
};

export default Lobby;
