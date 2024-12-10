import { useState, useEffect } from 'react';
import { quizSessionGetStatus } from '@/apis/quiz';
import { useParams, useSearchParams } from 'react-router-dom';
import { catchAxiosError } from '@/utils/helpers';
import { QuizSessionState as S } from '@/types/Enums';
import { message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { PlayerList } from './PlayerList';
import { QuizReturnedV2 } from '@/types/ApiReturnType';
import ControlBar from './ControlBar';

const AdminLobby: React.FC = () => {
  const [state, setState] = useState<S>(S.LOBBY);
  const [players, setPlayers] = useState<string[]>([]);
  const sessionId = parseInt(useParams().sessionId || '-1');
  const [searchParams] = useSearchParams();
  const quizId = parseInt(searchParams.get('quizId') || '-1');
  const autoStartNum = parseInt(searchParams.get('autoStartNum') || '-1');
  const [metadata, setMetadata] = useState<QuizReturnedV2>();

  async function fetchStatus() {
    await catchAxiosError(async () => {
      const { data: newStatus } = await quizSessionGetStatus(quizId, sessionId);
      console.log(`${newStatus.state} ${newStatus.metadata.name}`);

      setMetadata(newStatus.metadata);

      if (newStatus.state !== state) {
        setState(newStatus.state);
      }
      if (newStatus.players !== players) {
        setPlayers(newStatus.players);
      }
    });
  }

  useEffect(() => {
    console.log('useEffect');
    const intervalId = setInterval(fetchStatus, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold">Control Bar</h1>
        {/* Control Bar */}
        <ControlBar state={state} quizId={quizId} sessionId={sessionId} />

        {/* Quiz State */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
          <h1 className="text-xl font-bold">
            Current Game State: <span className="text-blue-300">{state}</span>
          </h1>
        </div>

        <h1 className="text-xl font-bold">Game Information</h1>
        {/* Quiz Name, Id, Player Count */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
          <h1 className="text-2xl font-bold">{metadata?.name}</h1>
          <p
            className="flex-1 cursor-pointer text-gray-300 hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(String(sessionId));
              message.success('Copied to clipboard');
            }}
          >
            Session ID: {sessionId} <CopyOutlined />
          </p>
          <p className="text-gray-300">
            {players.length}/{autoStartNum} to Start
          </p>
        </div>

        {/* Join Game Link */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
          <p className="text-xl font-bold">
            Visit{' '}
            <a
              href={`${window.location.origin}/join`}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              amandine.tian77.me/join
            </a>{' '}
            to join the game!
          </p>
        </div>

        {/* Players List */}
        <h1 className="text-xl font-bold">Players</h1>
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default AdminLobby;
