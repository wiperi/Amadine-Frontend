import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  FlexProps,
  Layout,
  Segmented,
  SegmentedProps,
} from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import React from 'react';
import { Flex } from 'antd';
import { Meta } from 'antd/es/list/Item';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Num of Questions',
    children: '10',
  },
  {
    key: '2',
    label: 'Time Created',
    children: '2024-02-02',
  },
  {
    key: '3',
    label: 'Duration',
    children: '10 mins',
  },
];

const QuizDescription: React.FC = () => (
  <Descriptions title="Quiz Name" items={items} column={1} className="" />
);

const Quiz: React.FC = () => {
  const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0]);
  const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0]);

  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', padding: '0 12px' }}>
        <Button>Create</Button>
        <Button>Select</Button>
        <Segmented<string>
          options={['Recent', 'Newest', 'Oldest']}
          onChange={(value) => {
            console.log(value); // string
          }}
        />
      </Header>

      <Content>
        <Flex style={{ flexWrap: 'wrap' }} justify={justify} align={alignItems}>
          <Card
            hoverable
            className="group relative h-60 w-56 overflow-hidden transition-all duration-300"
            cover={
              <div className="absolute inset-0">
                <img
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  alt="Background"
                  className="h-full w-full object-cover"
                />
              </div>
            }
          >
            <div className="absolute left-0 top-44 h-full w-full rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:-translate-y-32 group-hover:shadow-xl">
              <QuizDescription />
            </div>
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
};

export default Quiz;
