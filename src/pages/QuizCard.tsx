import { Descriptions, DescriptionsProps } from 'antd';
import { Quiz } from '../types/UserStore';
import { Card } from 'antd';

const QuizDescription: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Num of Questions',
      children: quiz.numQuestions.toString(),
    },
    {
      key: '2',
      label: 'Time Created',
      children: new Date(quiz.timeCreated).toLocaleDateString(),
    },
    {
      key: '3',
      label: 'Duration',
      children: `${quiz.duration} seconds`,
    },
  ];

  return <Descriptions title={quiz.name} items={items} column={1} />;
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
      </div>
    </Card>
  );
};

export default QuizCard;
