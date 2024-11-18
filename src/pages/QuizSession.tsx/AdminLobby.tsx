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
import { message } from 'antd';
import ControlBar from './ControlBar';
import { CopyOutlined } from '@ant-design/icons';
import { PlayerList } from './Lobby';
import { QuizReturnedV2 } from '@/types/ApiReturnType';
import ControlBarV2 from './ControlBarV2';

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


      <div className="flex flex-col gap-8 p-8">
        {/* Control Bar */}
        <ControlBarV2 state={state} quizId={quizId} sessionId={sessionId} />

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
          <p className="text-gray-300">{players.length}/{autoStartNum} to Start</p>
        </div>

        {/* Quiz State */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-700 p-6">
          <h1 className="text-xl font-bold">at {state}</h1>
        </div>

        {/* Players List */}
        <h1 className="text-3xl font-bold">Players</h1>
        <PlayerList players={players} />
      </div>
    </div>
  );

};

export default AdminLobby;
