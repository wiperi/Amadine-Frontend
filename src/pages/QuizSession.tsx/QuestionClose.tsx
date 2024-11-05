import { useContext } from 'react';
import ControlBar from './ControlBar';
import { StateContext } from './QuizSession';

const QuestionClose: React.FC = () => {
  const { quizId } = useContext(StateContext);

  return (
    <div className="h-screen w-full bg-slate-800 text-white">
      <div className="flex h-full flex-col p-8">
        {quizId !== -1 && <ControlBar />}
        <div className="flex flex-1 items-center justify-center">
          <h1 className="text-center text-5xl font-bold">Question Closed</h1>
        </div>
      </div>
    </div>
  );
};

export default QuestionClose;
