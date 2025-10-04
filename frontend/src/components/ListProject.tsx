import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Row, Col, Button, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const { Title } = Typography;

interface User {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  description?: string;
  budget?: number;
  owner: User;
  createdAt: string;
  updatedAt: string;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Projects</Title>
        <Link to="/projects/new">
          <Button type="primary">Create New Project</Button>
        </Link>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {projects.map(project => (
            <Col xs={24} sm={12} md={8} key={project.id}>
              <ProjectCard project={project} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProjectPage;
