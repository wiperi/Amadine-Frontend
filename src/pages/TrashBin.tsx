import { useDispatch, useSelector } from 'react-redux';
import { fetchTrashQuizzes } from '@/store/modules/userStore';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { Button} from 'antd';
import { useState } from 'react';

const TrashBin: React.FC = () => {
  const dispatch = useDispatch();

  const trashQuizzes = useSelector((state: RootState) => state.user.trashQuizzes);

  const mockData = Array.from({ length: 10 }, (_, index) => ({
    name: `Quiz ${index + 1}`,
    quizId: index + 1,
  }));

  useEffect(() => {
    dispatch(fetchTrashQuizzes());
  }, [dispatch]);

  const [isSelecting, setIsSelecting] = useState<Boolean>(false);


  return (
    <div className="h-[86vh]">
      <div className="h-[6%]">
        <Button style={{ marginRight: '10px' }} onClick={() => setIsSelecting(!isSelecting)}>
          {isSelecting ? 'Deselect All' : 'Select All'}
        </Button>
        <Button style={{ marginRight: '10px' }}>Restore</Button>
        <Button danger>Empty Trash Bin</Button>
      </div>
      <div className="h-[94%] overflow-y-scroll p-4">
        {/* <List
          itemLayout="horizontal"
          dataSource={mockData}
          renderItem={(quiz) => (
            // <List.Item className="h-[200px] outline outline-blue-500 bg-white">
            //   <List.Item.Meta title={quiz.name} description={`Quiz ID: ${quiz.quizId}`}
            //   className='bg-blue-500'/>
            // </List.Item>
            <List.Item className="outline-blue-500">
              <div className="h-[12%] outline-blue-500">{quiz.name}</div>
            </List.Item>
          )} */}
        {mockData.map((quiz) => (
          <div
            id={`quiz-${quiz.quizId}`}
            className={`group mb-4 h-[12%] cursor-pointer rounded-sm outline outline-gray-300 transition-all duration-300 ease-in-out`}
            key={quiz.quizId}
            onClick={() => {
              const element = document.getElementById(`quiz-${quiz.quizId}`);
              if (element) {
                if (element.classList.contains('outline-gray-300')) {
                  element.classList.remove('outline-gray-300');
                  element.classList.add('outline-blue-500');
                  element.classList.add('outline-4');
                } else {
                  element.classList.remove('outline-blue-500');
                  element.classList.add('outline-gray-300');
                  element.classList.remove('outline-4');
                }
              }
            }}
          >
            {quiz.name}
            <div
              id="red dot"
              className="h-4 w-4 rounded-full outline outline-black group-hover:bg-green-500"
            ></div>
          </div>
        ))}
      </div>
    </div>

    // <div className="">
    //   <div className="">Father</div>
    //   <div className="h-[200px] overflow-y-auto">
    //     {Array.from({ length: 100 }, (_, index) => (
    //       <p key={index}>info</p>
    //     ))}
    //   </div>
    // </div>
  );
};

export default TrashBin;
