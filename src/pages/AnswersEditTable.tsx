import React, { useState } from 'react';
import {
  ProColumns,
  EditableProTable,
} from '@ant-design/pro-components';
import { Button, Space } from 'antd';
// 导入 nanoid 用于生成唯一 ID
import { nanoid } from 'nanoid';

type Answer = {
  id: string;
  answer: string;
  correct: boolean;
};

const mockAnswers: Answer[] = [
  { id: '1', answer: 'Moon', correct: true },
  { id: '2', answer: 'Earth', correct: false },
];

const AnswersEditTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<Answer[]>(mockAnswers);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<Answer>[] = [
    {
      title: 'Answer',
      dataIndex: 'answer',
      width: '40%',
    },
    {
      title: 'Correct',
      dataIndex: 'correct',
      valueType: 'switch',
      width: '20%',
      valueEnum: {
        true: { text: '正确', status: 'Success' },
        false: { text: '错误', status: 'Error' },
      },
      render: (_, record) => (
        <span style={{ color: record.correct ? '#52c41a' : '#ff4d4f' }}>
          {record.correct ? '正确' : '错误'}
        </span>
      ),
    },
    {
      title: 'Actions',
      valueType: 'option',
      width: '25%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <EditableProTable<Answer>
      rowKey="id"
      headerTitle="Editable Answers Table"
      columns={columns}
      value={dataSource}
      onChange={(value) => setDataSource(value as Answer[])}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          // Here you can implement the logic to save the edited data
        },
        onChange: setEditableKeys,
      }}
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({
          id: nanoid(), // 使用 nanoid 生成唯一 ID
          answer: '',
          correct: false,
        }),
      }}
    />
  );
};

export default AnswersEditTable;

