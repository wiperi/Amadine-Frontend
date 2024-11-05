import { useContext } from "react";
import { PlayerList } from "./Lobby";
import { StateContext } from "./QuizSession";
import ControlBar from "./ControlBar";

const AnswerShow: React.FC = () => {
  const { players, quizId } = useContext(StateContext);

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        {quizId !== -1 && <ControlBar />}
        <h1 className="text-center text-5xl font-bold">What is the capital of France?</h1>

        <div className="flex gap-4">
          <div className="flex-1 rounded-lg bg-slate-700 p-4">
            <h2 className="text-2xl font-bold">Average answer time</h2>
            <p className="text-4xl font-bold">10.3s</p>
          </div>
          <div className="flex-1 rounded-lg bg-slate-700 p-4">
            <h2 className="text-2xl font-bold">Percentage of correct answers</h2>
            <p className="text-4xl font-bold">80%</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold">Correct Players</h1>
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default AnswerShow;
