import { useContext, useEffect, useReducer } from 'react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { StateContext } from './QuizSession';
import ControlBar from './ControlBar';
import { playerGetQuestionInfo, playerSubmitAnswer } from '@/apis/quiz';
import { QuizSessionState as S } from '@/types/Enums';
import { catchAxiosError } from '@/utils/helpers';
import { Question } from '@/types/UserStore';
import { message } from 'antd';

const QuestionOpen: React.FC = () => {
  const { state, atQuestion, playerId } = useContext(StateContext);

  // Get question
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  useEffect(() => {
    if (state === S.QUESTION_OPEN) {
      catchAxiosError(async () => {
        const { data: question } = await playerGetQuestionInfo(playerId, atQuestion);
        setQuestion(question as any);
      });
    }
  }, [state]);

  // Progress bar
  const growDuration = 3; // Duration to grow from 0 to 100
  const [progress, setProgress] = useState<number>(0);
  const [answerDisplay, setAnswerDisplay] = useState(false);
  const [barColor, setBarColor] = useState<'blue' | 'green'>('blue');
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let startTime = Date.now();

    if (!question) {

    } else {

    }


    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (!question) {
        // Growing phase
        const newProgress = Math.min(100, (elapsedTime / (growDuration * 1000)) * 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(interval);
          startTime = Date.now();
          setBarColor('green');
          setAnswerDisplay(true);
        }
      } else {
        // Shrinking phase
        const newProgress = Math.max(0, 100 * (1 - elapsedTime / (question.duration * 1000)));
        setProgress(newProgress);

        if (newProgress <= 0) {
          clearInterval(interval);
          setProgress(0);
        }
      }
    }, 16); // ~60fps for smooth animation

    return () => clearInterval(interval);
  }, [question]);

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        <h1 className="text-center text-5xl font-bold">
          {barColor === 'blue' ? 'Next question is comming!' : question?.question}
        </h1>

        <div className="flex justify-center">
          <ProgressBar progress={progress} barColor={barColor} />
        </div>

        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${answerDisplay ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}
        >
          {question?.answers.map((a) => (
            <button
              key={a.answerId}
              className={`rounded-lg ${selectedAnswerIds.has(a.answerId) ? 'bg-blue-500' : 'bg-slate-700'} p-6 text-xl font-semibold text-white hover:bg-blue-500`}
              onClick={async () => {
                if (selectedAnswerIds.has(a.answerId)) {
                  // there should be at least one answer
                  if (selectedAnswerIds.size === 1) {
                    message.warning('You should at least select one answer');
                    return;
                  }

                  selectedAnswerIds.delete(a.answerId);
                  setSelectedAnswerIds(new Set(selectedAnswerIds));
                } else {
                  selectedAnswerIds.add(a.answerId);
                  setSelectedAnswerIds(new Set(selectedAnswerIds));
                }

                catchAxiosError(async () => {
                  playerSubmitAnswer(Array.from(selectedAnswerIds), playerId, atQuestion);
                });
              }}
            >
              {a.answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionOpen;
