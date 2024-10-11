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
  Layout,
  message,
  Modal,
  Row,
  Segmented,
  SegmentedProps,
  theme,
} from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
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

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

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

  const [form] = Form.useForm<{ name: string; company: string }>();

  /////////////////////////////////////////////////////////////////////
  // <Drag Sort Table>
  /////////////////////////////////////////////////////////////////////
  const columns: ProColumns[] = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 100,
    },
    {
      title: 'Question Name',
      dataIndex: 'questionName',
      className: 'drag-visible',
      width: 200,
    },
    {
      title: 'Num of Answers',
      dataIndex: 'numOfAnswers',
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 100,
    },
  ];

  const data = [
    {
      key: 'key1',
      questionName: "John Brown",
      numOfAnswers: 3,
      actions: <Button>Edit</Button>,
    },
    {
      key: 'key2',
      questionName: 'Jim Green',
      numOfAnswers: 3,
      actions: (
        <Collapse>
          <Collapse.Panel header="Actions" key="1">
            <Button>Edit</Button>
          </Collapse.Panel>
        </Collapse>
      ),
    },
    {
      key: 'key3',
      questionName: 'Joe Black',
      numOfAnswers: 3,
      actions: <Button>Edit</Button>,
    },
  ];

  const [dataSource, setDataSource] = useState(data);

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };
  /////////////////////////////////////////////////////////////////////
  // </Drag Sort Table>
  /////////////////////////////////////////////////////////////////////

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

      {/* <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal> */}

      <ModalForm<{
        name: string;
        company: string;
      }>
        title="Edit Quiz"
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
            disabled={0 ? true : false}
            name="name"
            label="Quiz Name"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
            initialValue="what is the capital of the moon?"
          />

          <ProFormText
            width="md"
            name="company"
            label="Quiz Description"
            placeholder="请输入名称"
            disabled={1 ? true : false}
            initialValue="this is a quiz about the moon"
          />
        </ProForm.Group>

        <DragSortTable
          headerTitle="Quiz Questions"
          columns={columns}
          rowKey="key"
          search={false}
          pagination={false}
          dataSource={dataSource}
          dragSortKey="sort"
          onDragSortEnd={handleDragSortEnd}
          options={{
            search: false,
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div>edit answers {record.questionName}</div>
            ),
          }}
        />
      </ModalForm>
    </ConfigProvider>
  );
};

export default Quiz;
