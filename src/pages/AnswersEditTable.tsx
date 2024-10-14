import React, { useState } from 'react';
import { ProColumns, EditableProTable } from '@ant-design/pro-components';
import { Answer } from '@/types/UserStore';

const AnswersEditTable: React.FC<{
  answers: Answer[] | undefined;
}> = ({ answers }) => {

  const mockAnswers: Answer[] = [
    { answerId: 1, answer: 'Your Answer', colour: '#000000', correct: true },
  ];

  const [dataSource, setDataSource] = useState<Answer[]>(answers || mockAnswers);
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
      // Define the value enum for the switch
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

      // For every action column, render the following elements
      render: (text, record, _, action) => [
        // text: the text of current cell
        // record: the data object of the row
        // _: the index of the row
        // action: the action object contains some encapsulated functions
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.answerId);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.answerId !== record.answerId));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <EditableProTable<Answer>
      rowKey="answerId"
      pagination={false}
      // Column definitions
      columns={columns}
      value={dataSource}
      // Update the dataSource when the table value changes
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
      // Logic to add a new line
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({
          answerId: 0, // 使用 nanoid 生成唯一 ID
          answer: '',
          colour: '#000000',
          correct: false,
        }),
        creatorButtonText: 'Add a new answer', // 修改这里
      }}
    />
  );
};

export default AnswersEditTable;
