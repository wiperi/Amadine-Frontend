import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const FinalResult: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        <h1 className="text-center text-5xl font-bold">Final Result</h1>
        <h1 className="text-center text-3xl font-bold">Top Players</h1>

        <div className="mx-auto w-full flex flex-col gap-4 md:w-1/2 xl:w-1/3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((player) => (
            <div
              key={player}
              className="flex items-center gap-4 rounded-lg bg-slate-700 p-6"
            >
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-xl font-semibold">Player {player}</span>
                <span className="text-xl font-bold">1000 pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalResult;
