import React, { useState } from 'react';
import { Button, Input, InputNumber, Popconfirm, Space, message, Typography } from 'antd';
import { DragSortTable, ProColumns, EditableProTable } from '@ant-design/pro-components';
import { PlusOutlined, MenuOutlined } from '@ant-design/icons';
import AnswersEditTable from './AnswersEditTable';
import { Question, Quiz } from '@/types/UserStore';

interface TableItem {
  id: string;
  name: string;
  numAnswers: number;
  Duration: string;
}

const QuestionEditTable: React.FC<{
  questions: Question[] | undefined;
}> = ({ questions }) => {

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  // example of dataSource:
  // [
  //   { id: '1', name: 'Question 1', numAnswers: 3, Duration: '44 seconds' },
  //   { id: '2', name: 'Question 2', numAnswers: 2, Duration: '33 seconds' },
  // ]
  const [dataSource, setDataSource] = useState<TableItem[]>(
    questions?.map((question) => ({
      id: question.questionId.toString(),
      name: question.question,
      numAnswers: question.answers.length,
      Duration: question.duration.toString() + 's',
    })) || [],
  );

  // define shape of columns
  const columns: ProColumns<TableItem>[] = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
      formItemProps: {
        rules: [
          { required: true, message: 'Name is required' },
          { min: 5, max: 50, message: 'Name must be between 5 and 50 characters' },
        ],
      },
    },
    {
      title: '# Answers',
      dataIndex: 'numAnswers',
      editable: false,
      renderFormItem: () => <InputNumber min={1} max={180} />,
    },
    {
      title: 'Duration',
      dataIndex: 'Duration',
      editable: false,
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          key="delete"
          title="Are you sure to delete this question?"
          onConfirm={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
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
    <DragSortTable<TableItem>
      headerTitle="Questions"
      // 关闭分页器
      pagination={false}
      columns={columns}
      rowKey="id"
      dataSource={dataSource}
      onChange={(value) => setDataSource(value as TableItem[])}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
      expandable={{
        // Render the expanded row with the AnswersEditTable component
        expandedRowRender: (record) => {
          const question = questions?.find((question) => question.questionId === parseInt(record.id));
          return (
            <AnswersEditTable answers={question?.answers} />
          );
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
            const newId = (parseInt(dataSource[dataSource.length - 1]?.id || '0') + 1).toString();
            const newRow: TableItem = {
              id: newId,
              name: `New Person ${newId}`,
              numAnswers: 25,
              Duration: 'Click to edit',
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
