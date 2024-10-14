import React, { useState } from 'react';
import { Button, Input, InputNumber, Popconfirm, Space, message, Typography } from 'antd';
import { DragSortTable, ProColumns, EditableProTable } from '@ant-design/pro-components';
import { PlusOutlined, MenuOutlined } from '@ant-design/icons';
import AnswersEditTable from './AnswersEditTable';
import { Question } from '@/types/UserStore';

const QuestionEditTable: React.FC<{
  questions: Question[] | undefined;
}> = ({ questions }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  // example of dataSource:
  // [
  //   { questionId: 1, question: 'Question 1', duration: 44, points: 1, answers: [] },
  //   { questionId: 2, question: 'Question 2', duration: 33, points: 1, answers: [] },
  // ]
  const [dataSource, setDataSource] = useState<Question[]>(questions || []);

  // define shape of columns
  const columns: ProColumns<Question>[] = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      className: 'drag-visible',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'question',
      width: 250,
      formItemProps: {
        rules: [
          { required: true, message: 'Name is required' },
          { min: 5, max: 50, message: 'Name must be between 5 and 50 characters' },
        ],
      },
    },
    {
      title: 'Points',
      dataIndex: 'points',
      valueType: 'digit',
      formItemProps: {
        rules: [
          { required: true, message: 'Points are required' },
          {
            validator: (_, value) => {
              if (value < 1 || value > 10) {
                return Promise.reject('Points must be between 1 and 10');
              }
              return Promise.resolve();
            },
          },
        ],
      },
    },
    {
      title: '# Answers',
      editable: false,
      render: (_, record) => record.answers?.length || 0,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      editable: false,
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.questionId);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          key="delete"
          title="Are you sure to delete this question?"
          onConfirm={() => {
            setDataSource(dataSource.filter((item) => item.questionId !== record.questionId));
            message.success('Deleted successfully');
          }}
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable<Question>
      headerTitle="Questions"
      // 关闭分页器
      pagination={false}
      columns={columns}
      rowKey="questionId"
      dataSource={dataSource}
      onChange={(value) => setDataSource(value as Question[])}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
      expandable={{
        // Render the expanded row with the AnswersEditTable component
        expandedRowRender: (record) => {
          const question = questions?.find(
            (question) => question.questionId === record.questionId
          );
          return <AnswersEditTable answers={question?.answers} />;
        },
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          // Here you would typically make an API call to save the data
          message.success('Saved successfully');
        },
        onChange: setEditableRowKeys,
      }}
      search={false}
      // tool bar options
      options={{
        search: false,
        fullScreen: false,
        reload: false,
        setting: false,
        density: false,
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="add"
          onClick={() => {
            const newId = dataSource.length + 1;
            const newRow: Question = {
              questionId: newId,
              question: `New Question ${newId}`,
              duration: 25,
              points: 1,
              answers: [],
            };
            setDataSource([...dataSource, newRow]);
            setEditableRowKeys([...editableKeys, newId]);
          }}
          icon={<PlusOutlined />}
        >
          Add New Row
        </Button>,
      ]}
    />
  );
};

export default QuestionEditTable;
