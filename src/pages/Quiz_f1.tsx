import React, { useState } from 'react';
import { Layout, Button, Select, Radio, Card, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

interface QuizItem {
  id: string;
  name: string;
  imageUrl: string;
  duration: string;
  numQuestions: number;
  timeCreated: string;
}

interface Question {
  id: string;
  content: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

const Quiz: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'recent'>('newest');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]); // 假设这里会从API获取数据
  const [currentQuiz, setCurrentQuiz] = useState<QuizItem | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Mock quizItems data
  const mockQuizItems: QuizItem[] = [
    {
      id: '1',
      name: 'JavaScript Basics',
      imageUrl: 'https://example.com/js-basics.jpg',
      duration: '30 minutes',
      numQuestions: 20,
      timeCreated: '2023-05-01T10:00:00Z',
    },
    {
      id: '2',
      name: 'React Fundamentals',
      imageUrl: 'https://example.com/react-fundamentals.jpg',
      duration: '45 minutes',
      numQuestions: 25,
      timeCreated: '2023-05-02T14:30:00Z',
    },
    {
      id: '3',
      name: 'TypeScript Advanced',
      imageUrl: 'https://example.com/typescript-advanced.jpg',
      duration: '60 minutes',
      numQuestions: 30,
      timeCreated: '2023-05-03T09:15:00Z',
    },
    {
      id: '4',
      name: 'Node.js Essentials',
      imageUrl: 'https://example.com/nodejs-essentials.jpg',
      duration: '40 minutes',
      numQuestions: 22,
      timeCreated: '2023-05-04T11:45:00Z',
    },
    {
      id: '5',
      name: 'Node.js Essentials',
      imageUrl: 'https://example.com/nodejs-essentials.jpg',
      duration: '40 minutes',
      numQuestions: 22,
      timeCreated: '2023-05-04T11:45:00Z',
    },
    {
      id: '6',
      name: 'Node.js Essentials',
      imageUrl: 'https://example.com/nodejs-essentials.jpg',
      duration: '40 minutes',
      numQuestions: 22,
      timeCreated: '2023-05-04T11:45:00Z',
    },
  ];

  // Set the mocked data to the state
  React.useEffect(() => {
    setQuizItems(mockQuizItems);
  }, []);

  const handleSort = (value: 'newest' | 'oldest' | 'recent') => {
    setSortOrder(value);
  };

  const handleSelect = () => {
    // 实现选择逻辑
  };

  const handleCardClick = (item: QuizItem) => {
    setCurrentQuiz(item);
    setIsModalVisible(true);
    // 这里应该从 API 获取问题和答案
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentQuiz(null);
    setQuestions([]);
  };

  return (
    <Layout className="quiz-layout">
      <Header className="quiz-header">
        <div className="left-controls">
          <Button icon={<PlusOutlined />}>Create</Button>
          <Button onClick={handleSelect}>Select</Button>
        </div>
        {selectedItems.length > 0 && (
          <div className="middle-controls">
            <Button>Select All</Button>
            <Button>Delete</Button>
            <Button>Transfer</Button>
          </div>
        )}
        <div className="right-controls">
          <Radio.Group value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
            <Radio.Button value="newest">Newest</Radio.Button>
            <Radio.Button value="oldest">Oldest</Radio.Button>
            <Radio.Button value="recent">Recent</Radio.Button>
          </Radio.Group>
        </div>
      </Header>
      <Content className="quiz-content">
        <div className="quiz-card-container">
          {quizItems.map((item) => (
            <Card
              key={item.id}
              hoverable
              cover={<img alt={item.name} src={item.imageUrl} />}
              onClick={() => handleCardClick(item)}
              className="quiz-card"
            >
              <Card.Meta title={item.name} />
              <div className="quiz-card-details">
                <p>Duration: {item.duration}</p>
                <p>Questions: {item.numQuestions}</p>
                <p>Created: {item.timeCreated}</p>
              </div>
            </Card>
          ))}
        </div>
      </Content>
      <Modal
        title="Edit Quiz"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {currentQuiz && (
          <div className="quiz-edit-modal">
            <h2>{currentQuiz.name}</h2>
            <p>Description: {/* Add description field to QuizItem */}</p>
            <p>Duration: {currentQuiz.duration}</p>
            <p>Number of Questions: {currentQuiz.numQuestions}</p>
            <p>Created: {currentQuiz.timeCreated}</p>
            <p>Last Edited: {/* Add lastEdited field to QuizItem */}</p>
            <div className="questions-list">
              {questions.map((question) => (
                <div key={question.id} className="question-item">
                  <div className="question-content">{question.content}</div>
                  <Button>Edit</Button>
                  <Button>⋮</Button>
                  {/* 实现拖拽功能需要额外的库，如 react-beautiful-dnd */}
                  <div className="answers-list">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="answer-item">
                        <input
                          type="text"
                          value={answer.content}
                          onChange={() => {/* 实现更新逻辑 */}}
                        />
                        <Select
                          value={answer.isCorrect ? 'correct' : 'incorrect'}
                          onChange={() => {/* 实现更新逻辑 */}}
                        >
                          <Select.Option value="correct">Correct</Select.Option>
                          <Select.Option value="incorrect">Incorrect</Select.Option>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Quiz;
