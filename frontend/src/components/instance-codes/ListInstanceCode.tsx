import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface InstanceCode {
  instanceIdentifier: string;
  instanceIdentifierName: string;
  instanceCode: string;
  instanceCodeName: string;
  queryOrder: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface InstanceCodeListProps {
  token: string;
  onEdit: (instanceCode: InstanceCode) => void;
  onAdd: () => void;
  refreshList: boolean; // New prop to trigger list refresh
}

const InstanceCodeList: React.FC<InstanceCodeListProps> = ({ onEdit, onAdd, refreshList, token }) => {
  const [instanceCodes, setInstanceCodes] = useState<InstanceCode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInstanceCodes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/instance-codes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstanceCodes(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`인스턴스 코드를 가져오지 못했습니다: ${err.response.data.message || err.response.statusText}`);
      } else {
        setError('인스턴스 코드를 가져오는 중 예기치 않은 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInstanceCodes();
  }, [fetchInstanceCodes, refreshList]); // Add refreshList to dependency array

  const handleDelete = async (instanceIdentifier: string, instanceCode: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/instance-codes/${instanceIdentifier}/${instanceCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchInstanceCodes();
      } catch (error) {
        console.error('Error deleting instance code:', error);
      }
    }
  };

  const columns = [
    { title: "인스턴스식별자", dataIndex: 'instanceIdentifier', key: 'instanceIdentifier', sorter: (a: InstanceCode, b: InstanceCode) => a.instanceIdentifier.localeCompare(b.instanceIdentifier) },
    { title: "인스턴스식별자명", dataIndex: 'instanceIdentifierName', key: 'instanceIdentifierName' },
    { title: "인스턴스코드", dataIndex: 'instanceCode', key: 'instanceCode' },
    { title: "인스턴스코드명", dataIndex: 'instanceCodeName', key: 'instanceCodeName' },
    { title: "조회순서", dataIndex: 'queryOrder', key: 'queryOrder', sorter: (a: InstanceCode, b: InstanceCode) => a.queryOrder - b.queryOrder },
    { title: "생성일", dataIndex: 'createdAt', key: 'createdAt', render: (date: string) => new Date(date).toLocaleDateString() },
    {
      title: '작업',
      key: 'action',
      render: (_: any, record: InstanceCode) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.instanceIdentifier, record.instanceCode)} danger />
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={onAdd}>
          New Instance Code
        </Button>
      </div>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Table columns={columns} dataSource={instanceCodes} loading={loading} rowKey={record => `${record.instanceIdentifier}-${record.instanceCode}`} onRow={(record) => ({ onDoubleClick: () => onEdit(record) })} />
    </div>
  );
};

export default InstanceCodeList;
