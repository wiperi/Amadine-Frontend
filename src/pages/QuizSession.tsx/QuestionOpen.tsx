import { useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { ViewContext } from "./QuizSession";

const QuestionOpen: React.FC = () => {
  const { setView } = useContext(ViewContext);

  const growDuration = 3; // Duration to grow from 0 to 100
  const shrinkDuration = 5; // Duration to shrink from 100 to 0
  const [progress, setProgress] = useState<number>(0);
  const [display, setDisplay] = useState(false);
  const [barColor, setBarColor] = useState<'blue' | 'green'>('blue');

  useEffect(() => {
    let startTime = Date.now();
    let isGrowing = true;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      
      if (isGrowing) {
        // Growing phase
        const newProgress = Math.min(100, (elapsedTime / (growDuration * 1000)) * 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          isGrowing = false;
          startTime = Date.now();
          setDisplay(true);
        }
      } else {
        // Shrinking phase
        const newProgress = Math.max(0, 100 * (1 - elapsedTime / (shrinkDuration * 1000)));
        setProgress(newProgress);
        setBarColor('green');

        if (newProgress <= 0) {
          clearInterval(interval);
          setProgress(0);
          setView('ANSWER_SHOW');
        }
      }
    }, 16); // ~60fps for smooth animation

    return () => clearInterval(interval);
  }, []);

  return <div className="min-h-screen w-full bg-slate-800 text-white">
    <div className="flex flex-col gap-8 p-8 min-h-screen justify-center">
      <h1 className="text-5xl font-bold text-center">
        What is the capital of France?
      </h1>

      <div className="flex justify-center">
        <ProgressBar progress={progress} barColor={barColor} />
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${display ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}>
        {['London', 'Paris', 'Berlin', 'Madrid', 'Madrid', 'Madrid'].map((city) => (
          <button key={city} className="bg-slate-700 hover:bg-slate-600 text-white text-xl font-semibold rounded-lg p-6">
            {city}
          </button>
        ))}
      </div>

    </div>
  </div>;
};

export default QuestionOpen;