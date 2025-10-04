import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Table, Button, Typography, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface ProgramColumnName {
  projectId: number;
  columnId: string;
  columnName: string;
  tableConfig?: object;
}

const ListProgramColumnName: React.FC = () => {
  const [columnNames, setColumnNames] = useState<ProgramColumnName[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchColumnNames = async () => {
    try {
      const response = await api.get('/program-column-name');
      setColumnNames(response.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`컬럼 이름을 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('컬럼 이름을 가져오는 중 예기치 않은 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColumnNames();
  }, []);

  const handleDelete = async (projectId: number, columnId: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await api.delete(`/program-column-name/${projectId}/${columnId}`);
        fetchColumnNames(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting column name:', error);
        setError('컬럼 이름 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const columns = [
    { title: '프로젝트 ID', dataIndex: 'projectId', key: 'projectId', sorter: (a: ProgramColumnName, b: ProgramColumnName) => a.projectId - b.projectId },
    { title: '컬럼 ID', dataIndex: 'columnId', key: 'columnId' },
    { title: '컬럼명', dataIndex: 'columnName', key: 'columnName' },
    { title: '테이블 구성', dataIndex: 'tableConfig', key: 'tableConfig', render: (config: object) => JSON.stringify(config) },
    {
      title: '작업',
      key: 'action',
      render: (_: any, record: ProgramColumnName) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/program-column-name/${record.projectId}/${record.columnId}/edit`)} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.projectId, record.columnId)} danger />
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>프로그램 컬럼명 관리</Title>
        <Button type="primary" onClick={() => navigate('/program-column-name/new')}>
          새 컬럼명 등록
        </Button>
      </div>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Table columns={columns} dataSource={columnNames} loading={loading} rowKey={record => `${record.projectId}-${record.columnId}`} />
    </div>
  );
};

export default ListProgramColumnName;
