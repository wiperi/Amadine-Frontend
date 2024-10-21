import React, { useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DragSortTable, ProColumns } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import AnswersEditTable from './AnswersEditTable';
import { Question } from '@/types/UserStore';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingQuestions } from '@/store/modules/userStore';

const QuestionEditTable: React.FC<{
}> = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const dispatch = useDispatch();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const questions: Question[] = useSelector((state: any) => state.user.editingQuiz)?.questions || [];

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
      title: 'Duration',
      dataIndex: 'duration',
      valueType: 'digit',
      formItemProps: {
        rules: [
          { required: true, message: 'Duration is required' },
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.reject('Duration must be a positive number');
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
            const newQuestions = questions.filter((item) => item.questionId !== record.questionId);
            dispatch(setEditingQuestions({questions: newQuestions}));
            message.success('Deleted successfully');
          }}
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newQuestions: any) => {
    console.log('排序后的数据', newQuestions);
    dispatch(setEditingQuestions({questions: newQuestions}));
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable<Question>
      headerTitle="Questions"
      // 关闭分页器
      pagination={false}
      columns={columns}
      rowKey="questionId"
      dataSource={questions}
      onChange={(value) => dispatch(setEditingQuestions({questions: value as Question[]}))}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
      expandable={{
        // Render the expanded row with the AnswersEditTable component
        expandedRowRender: (record) => {
          return <AnswersEditTable questionId={record.questionId} />;
        },
        defaultExpandedRowKeys: expandedRowKeys,
        onExpand: (expanded, record) => {
          if (expanded) {
            setExpandedRowKeys(prevKeys => [...prevKeys, record.questionId]);
          } else {
            setExpandedRowKeys(prevKeys => prevKeys.filter(key => key !== record.questionId));
          }
        },
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          const newQuestions = questions.map(q => q.questionId === data.questionId ? data : q);
          dispatch(setEditingQuestions({questions: newQuestions}));
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
            const newId = questions.length + 1;
            const newRow: Question = {
              questionId: newId,
              question: `New Question ${newId}`,
              duration: 10,
              points: 1,
              answers: [],
            };
            dispatch(setEditingQuestions({questions: [...questions, newRow]}));
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
