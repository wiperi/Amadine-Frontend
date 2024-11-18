import { Button } from 'antd';
import { QuizSessionState as S, PlayerAction as A } from '@/types/Enums';
import { catchAxiosError } from '@/utils/helpers';
import { quizSessionUpdateState } from '@/apis/quiz';

type ControlBarProps = {
  state: S;
  quizId: number;
  sessionId: number;
}

const ControlBar: React.FC<ControlBarProps> = ({ state, quizId, sessionId }) => {
  const onEnd = () => {
    catchAxiosError(async () => {
      console.log('send: END');
      await quizSessionUpdateState(quizId, sessionId, A.END);
    });
  };

  const onGoToFinalResults = () => {
    catchAxiosError(async () => {
      console.log('send: GO_TO_FINAL_RESULTS');
      await quizSessionUpdateState(quizId, sessionId, A.GO_TO_FINAL_RESULTS);
    });
  };

  const onNextQuestion = () => {
    catchAxiosError(async () => {
      console.log('send: NEXT_QUESTION');
      await quizSessionUpdateState(quizId, sessionId, A.NEXT_QUESTION);
    });
  };

  const onSkipCountdown = () => {
    catchAxiosError(async () => {
      console.log('send: SKIP_COUNTDOWN');
      await quizSessionUpdateState(quizId, sessionId, A.SKIP_COUNTDOWN);
    });
  };

  return (
    <div className="flex gap-4 rounded-lg bg-slate-700 p-4">
      {[S.LOBBY, S.QUESTION_COUNTDOWN, S.QUESTION_CLOSE, S.ANSWER_SHOW].includes(state) && (
        <Button onClick={onNextQuestion}>Next Question</Button>
      )}
      {state === S.QUESTION_COUNTDOWN && <Button onClick={onSkipCountdown}>Skip Countdown</Button>}
      {[S.ANSWER_SHOW, S.QUESTION_CLOSE].includes(state) && (
        <Button onClick={onGoToFinalResults}>Go to Final Result</Button>
      )}
      {[S.QUESTION_OPEN, S.QUESTION_CLOSE].includes(state) && <Button danger>Go to Answer</Button>}
      <Button onClick={onEnd}>End Quiz</Button>
    </div>
  );
};

export default ControlBar;
