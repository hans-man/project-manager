import React from 'react';
import { Card, Typography, Button, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface Issue {
  id: number;
  title: string;
  status: string;
  assigneeName: string;
  project: {
    name: string;
  };
}

interface IssueCardProps {
  issue: Issue;
  onDelete: (id: number) => void;
}

const getStatusTagColor = (status: string) => {
  switch (status) {
    case '10': return 'blue';
    case '20': return 'green';
    case '30': return 'purple';
    case '40': return 'gold';
    case '11': return 'red';
    default: return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case '10': return '등록';
    case '20': return '개발완료';
    case '30': return '관리자완료';
    case '40': return '고객사완료';
    case '11': return '결함등록';
    default: return status;
  }
};

const IssueCard: React.FC<IssueCardProps> = ({ issue, onDelete }) => {
  return (
    <Card
      title={issue.title}
      extra={<Link to={`/issues/${issue.id}`}>View</Link>}
      actions={[
        <Link to={`/issues/${issue.id}/edit`}>
          <Button type="text" icon={<EditOutlined />} />
        </Link>,
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          onConfirm={() => onDelete(issue.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]}
      style={{ height: '100%' }}
    >
      <Text type="secondary">{issue.project.name}</Text>
      <div style={{ marginTop: '16px' }}>
        <Tag color={getStatusTagColor(issue.status)}>{getStatusText(issue.status)}</Tag>
        <Text strong style={{ marginLeft: '8px' }}>Assignee:</Text> <Text>{issue.assigneeName}</Text>
      </div>
    </Card>
  );
};

export default IssueCard;
