import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-form';
import QuestionEditTable from './QuestionEditTable';
import { Form, message } from 'antd';
import { Quiz } from '@/types/UserStore';

const QuizEditModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  quiz: Quiz | undefined;
}> = ({ open, setOpen, quiz }) => {
  const [form] = Form.useForm<{ name: string; description: string }>();

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

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
        await waitTime(2000);
        console.log(values);
        setOpen(false);
        message.success('Submitted successfully');
        return true;
      }}
      onFinishFailed={() => {
        message.error('Failed to submit');
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
            {
              max: 100,
              message: 'Description must be less than 100 characters',
            },
          ]}
        />
      </ProForm.Group>

      <QuestionEditTable />
    </ModalForm>
  );
};

export default QuizEditModal;
