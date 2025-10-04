import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Card, InputNumber } from 'antd';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

interface ProjectFormProps {
  currentUserId?: number; // Add currentUserId as an optional prop
}

const ProjectForm: React.FC<ProjectFormProps> = ({ currentUserId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [ownerId, setOwnerId] = useState<number | undefined>(currentUserId); // Initialize as undefined

  useEffect(() => {
    if (id) {
      // Fetch project data for editing
      const fetchProject = async () => {
        try {
          const response = await api.get(`/projects/${id}`);
          const projectData = response.data;
          form.setFieldsValue({
            name: projectData.name,
            description: projectData.description || '',
            budget: parseFloat(projectData.budget || '0'),
          });
          setOwnerId(projectData.owner?.id); // Correctly extract owner.id
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    } else {
      // For new projects, ensure ownerId is set from currentUserId prop
      setOwnerId(currentUserId);
    }
  }, [id, currentUserId, form]);

  const onFinish = async (values: any) => {
    if (!ownerId) {
      console.error('Owner ID is missing. Cannot save project.');
      return;
    }
    try {
      if (id) {
        // Update existing project
        await api.patch(`/projects/${id}`, {
          ...values,
          ownerId,
        });
      } else {
        // Create new project
        await api.post('/projects', {
          ...values,
          ownerId,
        });
      }
      navigate('/projects');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <Card>
      <Title level={3}>{id ? 'Edit Project' : 'Create New Project'}</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="프로젝트 이름"
          rules={[{ required: true, message: '프로젝트 이름을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="설명">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="budget" label="예산">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => navigate('/projects')} style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProjectForm;
