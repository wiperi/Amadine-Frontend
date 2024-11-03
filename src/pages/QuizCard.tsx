import { Descriptions, DescriptionsProps } from 'antd';
import { Quiz } from '../types/UserStore';
import { Card, Button } from 'antd';
import { quizSessionCreate } from '@/apis/quiz';
import { catchAxiosError } from '@/utils/helpers';

const QuizDescription: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const items: DescriptionsProps['items'] = [
    // {
    //   key: '1',
    //   label: 'Num of Questions',
    //   children: quiz.numQuestions.toString(),
    // },
    {
      key: '2',
      label: 'Time Created',
      children: new Date(quiz.timeCreated * 1000).toLocaleDateString(),
    },
    {
      key: '3',
      label: 'Duration',
      children: `${quiz.duration} seconds`,
    },
  ];
  return <Descriptions title={quiz.name} items={items} column={1} size="small" />;
};

const QuizCard: React.FC<{ quiz: Quiz; onClick: () => void }> = ({ quiz, onClick }) => {
  return (
    <Card
      hoverable
      className="group relative h-60 w-[25%] overflow-hidden transition-all duration-300"
      cover={
        <div className="absolute inset-0">
          <img
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
      }
      onClick={onClick}
    >
      <div className="absolute left-0 top-44 h-full w-full rounded-lg bg-gray-100 p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:-translate-y-32 group-hover:shadow-xl">
        <QuizDescription quiz={quiz} />
        <Button
          className="absolute left-1/2 mt-4 w-[90%] -translate-x-1/2"
          type="primary"
          onClick={async (ev) => {
            ev.stopPropagation();
            catchAxiosError(async () => {
              // prompt user to input start number
              const startNum = prompt('Please input the auto start number');
              if (!startNum) {
                return;
              }
              const {
                data: { sessionId },
              } = await quizSessionCreate(quiz.quizId, parseInt(startNum));
              window.open(`/quiz-session/${sessionId}?quizId=${quiz.quizId}`, '_blank');
            });
          }}
        >
          Play
        </Button>
      </div>
    </Card>
  );
};

export default QuizCard;
