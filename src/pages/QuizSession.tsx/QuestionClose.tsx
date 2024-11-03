import { useContext } from 'react';
import ControlBar from './ControlBar';
import { StateContext } from './QuizSession';

const QuestionClose: React.FC = () => {
  const { quizId } = useContext(StateContext);

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        {quizId !== -1 && <ControlBar />}
        <h1 className="text-center text-5xl font-bold">Question Closed</h1>
      </div>
    </div>
  );
};

export default QuestionClose;
