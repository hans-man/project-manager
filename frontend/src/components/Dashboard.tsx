import React from 'react';
import { Row, Col, Card, Typography, List, Statistic, Timeline } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// Mock Data - In a real app, this would come from API calls
const myOpenIssues = [
  { id: 1, title: '로그인 페이지 UI 깨짐', project: 'Project Alpha' },
  { id: 2, title: 'API 응답 속도 저하', project: 'Project Beta' },
  { id: 3, title: '결제 모듈 테스트 필요', project: 'Project Gamma' },
];

const projectStatus = {
  total: 12,
  inProgress: 5,
  completed: 7,
};

const recentActivity = [
  { id: 1, text: '[Project Alpha] 새로운 이슈가 등록되었습니다.', time: '10분 전' },
  { id: 2, text: '[Project Beta] 위키 페이지가 업데이트되었습니다.', time: '1시간 전' },
  { id: 3, text: '[Project Gamma] 새로운 멤버가 추가되었습니다.', time: '3시간 전' },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        대시보드
      </Title>
      <Row gutter={[16, 16]}>
        {/* My Open Issues Widget */}
        <Col xs={24} md={12} lg={8}>
          <Card title="나에게 할당된 이슈" style={{ height: '100%' }}>
            <List
              dataSource={myOpenIssues}
              renderItem={item => (
                <List.Item>
                  <Link to={`/issues/${item.id}`}>
                    <List.Item.Meta
                      title={item.title}
                      description={item.project}
                    />
                  </Link>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Project Status Widget */}
        <Col xs={24} md={12} lg={8}>
          <Card title="프로젝트 현황" style={{ height: '100%' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="총 프로젝트" value={projectStatus.total} />
              </Col>
              <Col span={8}>
                <Statistic title="진행 중" value={projectStatus.inProgress} />
              </Col>
              <Col span={8}>
                <Statistic title="완료" value={projectStatus.completed} />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Recent Activity Widget */}
        <Col xs={24} md={24} lg={8}>
          <Card title="최근 활동" style={{ height: '100%' }}>
            <Timeline
              items={recentActivity.map(item => ({
                children: `${item.text} (${item.time})`,
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
