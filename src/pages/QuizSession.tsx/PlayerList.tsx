import { Avatar } from 'antd';

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