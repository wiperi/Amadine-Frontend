import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-form';
import QuestionEditTable from './QuestionEditTable';
import { Button, Form, message } from 'antd';
import { Quiz } from '@/types/UserStore';
import { useDispatch } from 'react-redux';
import { fetchCreateQuiz } from '@/store/modules/userStore';

const QuizEditModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  quiz: Quiz | undefined;
}> = ({ open, setOpen, quiz }) => {
  const [form] = Form.useForm<{ name: string; description: string }>();
  const dispatch = useDispatch();

  return (
    <ModalForm<{
      name: string;
      description: string;
    }>
      title={<h1 className="mb-6 text-2xl font-bold">{quiz ? 'Edit Quiz' : 'Create Quiz'}</h1>}
      open={open}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpen(false),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          console.log(values);
          await dispatch(fetchCreateQuiz(values.name, values.description));
          setOpen(false);
          message.success('Submitted successfully');
          return true;
        } catch (error) {
          console.log(error);
          message.error('Failed to submit');
        }
      }}
      onFinishFailed={() => {
        message.error('Failed to submit');
      }}
      submitter={{
        render: (props, defaultDoms) => {
          return [
            <Button key="delete" onClick={() => {/* Add delete logic here */}} danger>
              Delete
            </Button>,
            ...defaultDoms,
          ];
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Quiz Name"
          placeholder="Quiz Name"
          initialValue={quiz?.name}
          rules={[
            { required: true, message: 'Quiz name is required' },
            {
              pattern: /^[a-z0-9\s]+$/i,
              message: 'Quiz name can only contain letters, numbers, and spaces',
            },
          ]}
        />

        <ProFormText
          width="md"
          name="description"
          label="Quiz Description"
          placeholder="Quiz Description"
          initialValue={quiz?.description}
          rules={[
            { required: true, message: 'Quiz description is required' },
            {
              max: 100,
              message: 'Description must be less than 100 characters',
            },
          ]}
        />
      </ProForm.Group>

      <QuestionEditTable questions={quiz?.questions} />
    </ModalForm>
  );
};

export default QuizEditModal;
