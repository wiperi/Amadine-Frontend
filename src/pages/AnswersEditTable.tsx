import React, { useState } from 'react';
import { ProColumns, EditableProTable } from '@ant-design/pro-components';
import { Answer, Question } from '@/types/UserStore';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingAnswers } from '@/store/modules/userStore';

const AnswersEditTable: React.FC<{
  questionId: number | undefined;
}> = ({ questionId }) => {

  const dispatch = useDispatch();

  let answers: Answer[] | undefined = useSelector((state: any) => state.user.editingQuiz)?.questions
  ?.find((question: Question) => question.questionId === questionId)?.answers;


  const [dataSource, setDataSource] = useState<Answer[]>(answers || []);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<Answer>[] = [
    {
      title: 'Answer',
      dataIndex: 'answer',
      width: '40%',
      formItemProps: {
        rules: [
          { required: true, message: 'Answer is required' },
          { max: 30, message: 'Answer must be less than 30 characters' },
        ],
      },
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
            const newAnswers = dataSource.filter((item) => item.answerId !== record.answerId);
            setDataSource(newAnswers);
            dispatch(setEditingAnswers({questionId, answers: newAnswers}));
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
          dispatch(setEditingAnswers({questionId, answers: [...answers || [], data]}));
        },
        onChange: setEditableKeys,
      }}
      // Logic to add a new line
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({
          answerId: dataSource.length + 1,
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
