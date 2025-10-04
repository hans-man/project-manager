import React, { useState, useEffect } from 'react';
import api from './services/api';
import { Form, Input, Button, Typography, Card, Select, DatePicker, Row, Col, Alert } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

interface Project {
  id: number;
  name: string;
}

interface User {
  id: number;
  loginId: string;
  name: string;
}

const IssueForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [businessClassifications, setBusinessClassifications] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [projectsResponse, usersResponse, businessClassificationsResponse] = await Promise.all([
          api.get('/projects'),
          api.get('/users'),
          api.get('/instance-codes'),
        ]);

        setProjects(projectsResponse.data);
        setUsers(usersResponse.data);
        setBusinessClassifications(businessClassificationsResponse.data.filter((item: any) => item.instanceIdentifier === '00000000001'));

        if (id) {
          const issueResponse = await api.get(`/issues/${id}`);
          const issueData = issueResponse.data;
          form.setFieldsValue({
            ...issueData,
            developmentDueDate: issueData.developmentDueDate ? moment(issueData.developmentDueDate) : null,
            developmentCompletionDate: issueData.developmentCompletionDate ? moment(issueData.developmentCompletionDate) : null,
            managerReviewCompletionDate: issueData.managerReviewCompletionDate ? moment(issueData.managerReviewCompletionDate) : null,
            businessOwnerReviewCompletionDate: issueData.businessOwnerReviewCompletionDate ? moment(issueData.businessOwnerReviewCompletionDate) : null,
            projectId: issueData.project?.id || null,
          });
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      if (id) {
        await api.patch(`/issues/${id}`, values);
      } else {
        await api.post('/issues', values);
      }
      navigate('/issues');
    } catch (error) {
      setMessage('Failed to save issue.');
      console.error('Error saving issue:', error);
    }
  };

  return (
    <Card>
      <Title level={3}>{id ? 'Edit Issue' : 'Create New Issue'}</Title>
      {message && <Alert message={message} type="error" showIcon style={{ marginBottom: '24px' }}/>}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="title" label="제목" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="projectId" label="프로젝트" rules={[{ required: true }]}>
              <Select disabled={!!id}>
                {projects.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="설명">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="testClassification" label="업무분류">
              <Select>
                {businessClassifications.map(c => <Option key={c.instanceCode} value={c.instanceCode}>{c.instanceCodeName}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="testRound" label="테스트 회차">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="programId" label="프로그램 ID">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="programName" label="프로그램 이름">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="programDescription" label="프로그램 설명">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="assigneeId" label="담당자">
              <Select>
                {users.map(u => <Option key={u.id} value={u.id}>{u.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="상태">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="developmentDueDate" label="개발 마감일">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="developmentCompletionDate" label="개발 완료일">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="managerId" label="관리자">
              <Select>
                {users.map(u => <Option key={u.id} value={u.id}>{u.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="managerReviewCompletionDate" label="관리자 검토 완료일">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="businessOwnerId" label="고객사">
              <Select>
                {users.map(u => <Option key={u.id} value={u.id}>{u.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="businessOwnerReviewCompletionDate" label="고객사 완료일">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => navigate('/issues')} style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default IssueForm;
