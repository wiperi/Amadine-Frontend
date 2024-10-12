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
import { fetchQuizzes } from '@/store/modules/userStore';
const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Num of Questions',
    children: '10',
  },
  {
    key: '2',
    label: 'Time Created',
    children: '2024-02-02',
  },
  {
    key: '3',
    label: 'Duration',
    children: '10 mins',
  },
];

const QuizDescription: React.FC = () => <Descriptions title="Quiz Name" items={items} column={1} />;

const Quiz: React.FC = () => {

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
  const quizzes = useSelector((state: any) => state.user.quizzes);
  console.log(quizzes);


  /////////////////////////////////////////////////////////////////////
  // <Quiz Edit Modal>
  /////////////////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleEditQuiz = () => {
    showModal();
  };

  const handleCreateQuiz = () => {
    showModal();
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const [form] = Form.useForm<{ name: string; description: string }>();
  /////////////////////////////////////////////////////////////////////
  // </Quiz Edit Modal>
  /////////////////////////////////////////////////////////////////////

  return (
    <ConfigProvider theme={{ components: { Layout: { bodyBg: 'white', headerBg: 'white' } } }}>
      <Layout>
        {/* Control Bar */}
        <Header className="flex items-center justify-between px-0">
          <div>
            <Button type="primary" className="mr-2" onClick={handleCreateQuiz}>
              Create
            </Button>
            <Button>Select</Button>
          </div>
          <Segmented<string>
            options={['Recent', 'Newest', 'Oldest']}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
        </Header>

        {/* Quiz Cards */}
        <Content>
          <Flex style={{ flexWrap: 'wrap' }} justify={'flex-start'} align={'flex-start'}>
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
              onClick={handleEditQuiz}
            >
              <div className="absolute left-0 top-44 h-full w-full rounded-lg bg-gray-100 p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:-translate-y-32 group-hover:shadow-xl">
                <QuizDescription />
              </div>
            </Card>
          </Flex>
        </Content>
      </Layout>

      {/* Quiz Edit Modal */}
      <ModalForm<{
        name: string;
        description: string;
      }>
        title={<h1 className="text-2xl font-bold mb-6">Edit Quiz</h1>}
        open={open}
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: handleCancel,
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          setOpen(false);
          message.success('提交成功');
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Quiz Name"
            placeholder="Quiz Name"
            initialValue="what is the capital of the moon?"
          />

          <ProFormText
            width="md"
            name="description"
            label="Quiz Description"
            placeholder="Quiz Description"
            initialValue="this is a quiz about the moon"
          />
        </ProForm.Group>

        <QuestionEditTable />

      </ModalForm>
    </ConfigProvider>
  );
};

export default Quiz;
