import { Form, Input, Button } from 'antd';

const PlayerJoin: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div className="min-h-screen w-full bg-slate-800 text-white">
      <div className="flex min-h-screen flex-col justify-center gap-8 p-8">
        <h1 className="text-center text-3xl font-bold">Join Quiz Session</h1>

        <div className="mx-auto w-full md:w-1/2">
          <Form form={form} onFinish={onFinish} layout="vertical" className="flex flex-col gap-4">
            <Form.Item
              name="sessionId"
              rules={[{ required: true, message: 'Please input session ID!' }]}
            >
              <Input
                placeholder="Session ID"
                className="h-20 rounded-md bg-slate-700 text-white placeholder:text-gray-400"
                variant="borderless"
              />
            </Form.Item>

            <Form.Item
              name="playerName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                placeholder="Enter your name"
                className="h-20 rounded-md bg-slate-700 text-white placeholder:text-gray-400"
                variant="borderless"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="h-12 w-full bg-blue-500 hover:bg-blue-400"
              >
                Join
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PlayerJoin;
