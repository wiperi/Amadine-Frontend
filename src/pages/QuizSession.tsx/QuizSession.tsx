import { useState, createContext } from "react";
import Lobby from "./Lobby";
import QuestionOpen from "./QuestionOpen";
import AnswerShow from "./AnswerShow";
import FinalResult from "./FinalResult";

type View = 'LOBBY' | 'QUESTION_COUNTDOWN' | 'QUESTION_OPEN' | 'QUESTION_CLOSE' | 'ANSWER_SHOW' | 'FINAL_RESULT' | 'END';

type ViewContextType = {
  view: View;
  setView: (view: View) => void;
};

export const ViewContext = createContext<ViewContextType>({
  view: 'LOBBY',
  setView: () => {},
});

const QuizSession: React.FC = () => {
  const [view, setView] = useState<View>('LOBBY');

  return (
    <ViewContext.Provider value={{ view, setView }}>
      <div>
        {view === 'LOBBY' && <Lobby />}
        {['QUESTION_COUNTDOWN', 'QUESTION_OPEN'].includes(view) && <QuestionOpen />}
        {view === 'ANSWER_SHOW' && <AnswerShow />}
        {view === 'FINAL_RESULT' && <FinalResult />}
      </div>
    </ViewContext.Provider>
  );
};

export default QuizSession;
