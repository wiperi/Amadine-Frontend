import React, { useState } from 'react';
import { ProColumns, EditableProTable } from '@ant-design/pro-components';
import { Answer, Question } from '@/types/UserStore';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingAnswers } from '@/store/modules/userStore';
import { message } from 'antd';

const AnswersEditTable: React.FC<{
  questionId: number | undefined;
}> = ({ questionId }) => {

  const dispatch = useDispatch();

  const answers: Answer[] = useSelector((state: any) => state.user.editingQuiz)?.questions
    ?.find((question: Question) => question.questionId === questionId)?.answers || [];

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
            const newAnswers = answers.filter((item) => item.answerId !== record.answerId);
            if (!newAnswers.find(answer => answer.correct === true)) {
              message.warning('At least one answer should be marked as correct.');
            }
            dispatch(setEditingAnswers({questionId, answers: newAnswers}));
            message.success('Answer deleted');
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
      value={answers}
      // Update the answers when the table value changes
      onChange={(value) => dispatch(setEditingAnswers({questionId, answers: value as Answer[]}))}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          const newAnswers = [...answers.filter(answer => answer.answerId !== data.answerId), data];
          if (!newAnswers.find(answer => answer.correct === true)) {
            message.warning('At least one answer should be marked as correct.');
          }
          dispatch(setEditingAnswers({questionId, answers: newAnswers}));
          message.success('Answer saved');
      },
        onChange: setEditableKeys,
      }}
      // Logic to add a new line
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({
          answerId: answers.length + 1,
          answer: '',
          colour: '#000000',
          correct: false,
        }),
        creatorButtonText: 'Add a new answer',
      }}
    />
  );
};

export default AnswersEditTable;
