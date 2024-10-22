import { useDispatch, useSelector } from 'react-redux';
import { fetchEmptyTrash, fetchRestoreQuiz, fetchTrashQuizzes } from '@/store/modules/userStore';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { useState } from 'react';

const TrashBin: React.FC = () => {
  const dispatch = useDispatch();

  const trashQuizzes = useSelector((state: RootState) => state.user.trashQuizzes);

  // const trashQuizzes = Array.from({ length: 20 }, (_, index) => ({
  //   name: `Quiz ${index + 1}`,
  //   quizId: index + 1,
  // }));

  useEffect(() => {
    dispatch(fetchTrashQuizzes());
  }, [dispatch]);

  const [isSelecting, setIsSelecting] = useState<Boolean>(false);

  const [selectedQuizzes, setSelectedQuizzes] = useState<Set<number>>(new Set());

  return (
    <div className="flex h-[86vh] flex-col">
      <div id="trash-bin-header" className="mb-4 flex flex-initial flex-wrap items-center gap-2">
        <Button
          type={`${isSelecting ? 'primary' : 'default'}`}
          onClick={() => {
            if (!isSelecting) {
              trashQuizzes.forEach((quiz) => {
                selectedQuizzes.add(quiz.quizId);
              });
              setSelectedQuizzes(new Set(selectedQuizzes));
            } else {
              setSelectedQuizzes(new Set());
            }
            setIsSelecting(!isSelecting);
          }}
        >
          Select All
        </Button>
        <Button
          onClick={async () => {
            if (selectedQuizzes.size === 0) {
              message.warning('No quizzes selected');
              return;
            }
            try {
              await dispatch(fetchRestoreQuiz(Array.from(selectedQuizzes)));
              message.success('Quizzes restored');
            } catch (error) {
              console.error('Failed to restore quizzes:', error);
              message.error('Failed to restore quizzes');
            }
            setSelectedQuizzes(new Set());
          }}
        >
          Restore
        </Button>
        <Popconfirm
          title="Are you sure you want to empty the trash bin?"
          onConfirm={async () => {
            console.log(Array.from(selectedQuizzes));
            try {
              await dispatch(fetchEmptyTrash(Array.from(selectedQuizzes)));
              message.success('Trash emptied');
            } catch (error) {
              console.error('Failed to empty trash:', error);
              message.error('Failed to empty trash');
            }
          }}
        >
          <Button color="danger" variant="solid">
            Empty Trash Bin
          </Button>
        </Popconfirm>
      </div>
      <div id="trash-bin-list" className="flex-initial overflow-y-scroll p-4">
        {trashQuizzes.map((quiz) => {
          return (
            <TrashBinItem
              quiz={quiz}
              isSelected={selectedQuizzes.has(quiz.quizId)}
              onclick={() => {
                console.log(selectedQuizzes);
                selectedQuizzes.has(quiz.quizId)
                  ? selectedQuizzes.delete(quiz.quizId)
                  : selectedQuizzes.add(quiz.quizId);
                setSelectedQuizzes(new Set(selectedQuizzes));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const TrashBinItem: React.FC<{
  quiz: { name: string; quizId: number };
  isSelected: boolean;
  onclick: () => void;
}> = ({ quiz, isSelected, onclick }) => {
  const selectedStyle = `outline-blue-500 outline-4`;
  const unselectedStyle = `outline-gray-300`;
  return (
    <div
      className={`mb-4 flex h-[8%] cursor-pointer items-center justify-between rounded-sm p-4 font-bold outline transition-all duration-300 ease-in-out ${isSelected ? selectedStyle : unselectedStyle}`}
      onClick={onclick}
    >
      <div className="flex-initial overflow-hidden text-ellipsis whitespace-nowrap">
        {quiz.name}
      </div>
      <div className="flex-initial font-light">Quiz ID: {quiz.quizId}</div>
    </div>
  );
};

export default TrashBin;
