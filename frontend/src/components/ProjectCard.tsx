import React from 'react';
import { Card, Typography, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface Project {
  id: number;
  name: string;
  description?: string;
  owner: {
    name: string;
  };
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  return (
    <Card
      title={project.name}
      actions={[
        <Link to={`/projects/${project.id}/edit`}>
          <Button type="text" icon={<EditOutlined />} />
        </Link>,
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          onConfirm={() => onDelete(project.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]}
      style={{ height: '100%' }}
    >
      <Text type="secondary">{project.description}</Text>
      <div style={{ marginTop: '16px' }}>
        <Text strong>Owner:</Text> <Text>{project.owner?.name}</Text>
      </div>
    </Card>
  );
};

export default ProjectCard;
