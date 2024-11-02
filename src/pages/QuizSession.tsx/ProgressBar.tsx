type ProgressBarProps = {
  progress: number;
  barColor?: 'blue' | 'green';
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, barColor }) => {
  return (
    <div className={`w-1/2 h-6 rounded-full bg-slate-700`}>
      <div
        className={`h-6 rounded-full ${barColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}
        style={{ width: `${progress}%`, transition: 'width 16ms linear'}}
      />
    </div>
  );
};

export default ProgressBar;
