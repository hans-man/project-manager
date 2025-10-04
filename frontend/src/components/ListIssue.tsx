import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button, Typography, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import IssueCard from './IssueCard';

const { Title } = Typography;

interface Project {
  id: number;
  name: string;
}

interface Issue {
  id: number;
  title: string;
  description: string;
  taskName: string;
  testClassification: string;
  testRound: number;
  programId: string;
  programName: string;
  programDescription: string;
  assigneeName: string;
  developmentDueDate: string;
  developmentCompletionDate: string;
  status: string;
  managerName: string;
  managerReviewCompletionDate: string;
  businessOwnerName: string;
  businessOwnerReviewCompletionDate: string;
  project: Project;
  createdAt: string;
  updatedAt: string;
}

interface IssueListProps {
  token: string;
}

const IssueList: React.FC<IssueListProps> = ({ token }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/issues/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        // Refresh the list after deletion
        setIssues(issues.filter(issue => issue.id !== id));
      } catch (error) {
        console.error('Error deleting issue:', error);
        setError('이슈 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/issues', { headers: { Authorization: `Bearer ${token}` } });
        setIssues(Array.isArray(response.data) ? response.data : []);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`이슈를 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
        } else {
          setError('이슈를 가져오는 중 예기치 않은 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [token]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>프로젝트 이슈</Title>
        <Button
          type="primary"
          onClick={() => navigate('/issues/new')}
        >
          새 이슈 등록
        </Button>
      </div>
      
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }}/>}

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {issues.map(issue => (
            <Col xs={24} sm={12} md={8} key={issue.id}>
              <IssueCard issue={issue} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default IssueList;