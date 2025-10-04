import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Row, Col, Button, Typography, Spin, Alert } from 'antd';
import ProgramListBulkUpload from './ProgramListBulkUpload';
import { useNavigate } from 'react-router-dom';
import ProgramCard from './ProgramCard';

const { Title } = Typography;

interface ProgramList {
  id: number;
  column1: string;
  column2: string;
  // ... up to column60
}

const ListProgram: React.FC = () => {
  const [programList, setProgramList] = useState<ProgramList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchProgramList = async () => {
    try {
      const response = await api.get('/program-list');
      setProgramList(response.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`프로그램 목록을 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('프로그램 목록을 가져오는 중 예기치 않은 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramList();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await api.delete(`/program-list/${id}`);
        fetchProgramList(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting program list item:', error);
        setError('프로그램 목록 항목 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>프로그램 목록</Title>
        <Button
          type="primary"
          onClick={() => navigate('/program-list/new')}
        >
          새 프로그램 목록 등록
        </Button>
      </div>
      
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }}/>}

      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {programList.map((program) => (
            <Col xs={24} sm={12} md={8} key={program.id}>
              <ProgramCard program={program} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}

      <ProgramListBulkUpload token="your_token_here" onUploadSuccess={fetchProgramList} />
    </div>
  );
};

export default ListProgram;
