import { useParams } from 'react-router-dom';
import '@/styles/global.css';
import { Avatar, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { ViewContext } from './QuizSession';

const Lobby: React.FC = () => {
  const { id } = useParams();
  const [countdown, setCountdown] = useState<number>(-1);

  const { setView } = useContext(ViewContext);

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
        <div className="flex gap-4 rounded-lg bg-slate-700 p-4">
          <button
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            onClick={() => {
              // Display a huge countdown on the middle of the screen
              setCountdown(3);
              const interval = setInterval(() => {
                setCountdown((prev) => {
                  if (prev <= 1) {
                    clearInterval(interval);
                    // Set the view to question countdown
                    setView('QUESTION_COUNTDOWN');
                    return -1;
                  }
                  return prev - 1;
                });
              }, 1000);
            }}
          >
            Start Game
          </button>
          <button className="rounded bg-gray-500 px-4 py-2 hover:bg-gray-600">Settings</button>
          <button className="rounded bg-red-500 px-4 py-2 hover:bg-red-600">Leave</button>
        </div>

        {/* Information Panel */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
          <h1 className="text-2xl font-bold">Quiz Name</h1>
          <p
            className="flex-1 cursor-pointer text-gray-300 hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(id || '');
              message.success('Copied to clipboard');
            }}
          >
            Session ID: {id} <CopyOutlined />
          </p>
          <p className="text-gray-300">10/12 to Start</p>
        </div>

        <h1 className="text-3xl font-bold">Players</h1>

        <PlayerList />
      </div>
    </div>
  );
};

export const PlayerList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((player) => (
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
