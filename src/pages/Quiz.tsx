import {
  Button,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  FlexProps,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Row,
  Segmented,
  SegmentedProps,
  theme,
} from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import {
  ModalForm,
  ProColumns,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  DragSortTable,
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import QuestionEditTable from './QuestionEditTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes, setEditingQuiz, setQuizzes } from '@/store/modules/userStore';
import { Quiz as QuizType } from '@/types/UserStore';
import QuizCard from './QuizCard';
import QuizEditModal from './QuizEditModal';

const Quiz: React.FC = () => {

  /////////////////////////////////////////////////////////////////////
  // Quiz Data Fetching
  /////////////////////////////////////////////////////////////////////
  // use dispatch
  const dispatch = useDispatch();

  // fetch quizzes every time the page is loaded
  useEffect(() => {
    try {
      dispatch(fetchQuizzes());
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch quizzes');
    }
  }, []);

  // get quizzes from redux store
  const quizzes: QuizType[] = useSelector((state: any) => state.user.quizzes);
  /////////////////////////////////////////////////////////////////////
  // \Quiz Data Fetching
  /////////////////////////////////////////////////////////////////////

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const onQuizCardClick = (quizId: number) => {
    setSelectedQuizId(quizId);
    const quiz = quizzes.find((quiz) => quiz.quizId === quizId);
    const emptyQuiz = {
      questions: [],
    }
    dispatch(setEditingQuiz(quiz || emptyQuiz));
    setIsModalOpen(true);
  };

  return (
    <ConfigProvider theme={{ components: { Layout: { bodyBg: 'white', headerBg: 'white' } } }}>
      <Layout>
        {/* Control Bar */}
        <Header className="flex items-center justify-between px-0">
          <div>
            <Button type="primary" className="mr-2" onClick={() => onQuizCardClick(0)}>
              Create
            </Button>
            <Button>Select</Button>
          </div>
          <Segmented<string>
            options={['Recent Edited', 'Newest', 'Oldest']}
            onChange={(value) => {
              console.log(value); // string
              const sortedQuizzes = quizzes.slice().sort((a, b) => {
                if (value === 'Recent Edited') {
                  return b.timeLastEdited - a.timeLastEdited;
                } else if (value === 'Newest') {
                  return b.timeCreated - a.timeCreated;
                } else if (value === 'Oldest') {
                  return a.timeCreated - b.timeCreated;
                }
                return 0;
              });
              dispatch(setQuizzes(sortedQuizzes));
            }}
          />
        </Header>

        {/* Quiz Cards */}
        <Content>
          <Flex style={{ flexWrap: 'wrap' }} justify={'flex-start'} align={'flex-start'}>
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.quizId} quiz={quiz} onClick={() => onQuizCardClick(quiz.quizId)} />
            ))}
          </Flex>
        </Content>
      </Layout>

      {/* Quiz Edit Modal */}
      <QuizEditModal open={isModalOpen} setOpen={setIsModalOpen} />
    </ConfigProvider>
  );
};

export default Quiz;
