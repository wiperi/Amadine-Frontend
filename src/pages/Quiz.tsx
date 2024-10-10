import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  FlexProps,
  Layout,
  Modal,
  Row,
  Segmented,
  SegmentedProps,
  theme,
} from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Flex } from 'antd';

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

  /////////////////////////////////////////////////////////////////////
  // Quiz Edit Modal
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

  return (
    <ConfigProvider theme={{ components: { Layout: { bodyBg: 'white', headerBg: 'white' } } }}>
      <Layout>
        {/* Control Bar */}
        <Header className="flex items-center justify-between px-0">
          <div>
            <Button className="mr-2">Create</Button>
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

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </ConfigProvider>
  );
};

export default Quiz;
