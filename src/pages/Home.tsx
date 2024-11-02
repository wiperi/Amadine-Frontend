import { Row, Col } from 'antd';

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Ongoing Quizzes</h1>
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Col
            key={item}
            xs={24} // 手机端一行一个
            sm={12} // 平板端一行两个
            md={8} // 中等屏幕一行三个
            lg={6} // 大屏幕一行四个
            xl={4} // 超大屏幕一行六个
          >
            <div className="flex h-32 w-full items-center justify-center bg-gray-300">
              box {item}
            </div>
          </Col>
        ))}
      </Row>

      <h1>Most Popular Quizzes</h1>
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Col
            key={item}
            xs={24} // 手机端一行一个
            sm={12} // 平板端一行两个
            md={8} // 中等屏幕一行三个
            lg={6} // 大屏幕一行四个
            xl={4} // 超大屏幕一行六个
          >
            <div className="flex h-32 w-full items-center justify-center bg-gray-300">
              box {item}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
