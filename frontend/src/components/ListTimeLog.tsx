import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Matching backend entities
interface Project {
  id: number;
  name: string;
}
interface User {
  id: number;
  name: string;
}
interface Task {
  id: number;
  title: string;
}

interface TimeLog {
  id: number;
  hours: number;
  date: string;
  project: Project;
  user: User;
  task: Task;
  createdAt: string;
  updatedAt: string;
}

const TimeLogPage: React.FC = () => {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchTimeLogs = async () => {
    try {
      const response = await api.get('/timelogs');
      setTimeLogs(response.data);
    } catch (error) {
      console.error('Error fetching time logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeLogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await api.delete(`/timelogs/${id}`);
        fetchTimeLogs(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting time log:', error);
      }
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a: TimeLog, b: TimeLog) => a.id - b.id },
    { title: '프로젝트', dataIndex: ['project', 'name'], key: 'projectName' },
    { title: '태스크', dataIndex: ['task', 'title'], key: 'taskTitle' },
    { title: '사용자', dataIndex: ['user', 'name'], key: 'userName' },
    { title: '시간', dataIndex: 'hours', key: 'hours', sorter: (a: TimeLog, b: TimeLog) => a.hours - b.hours },
    { title: '날짜', dataIndex: 'date', key: 'date', render: (date: string) => new Date(date).toLocaleDateString() },
    {
      title: '작업',
      key: 'action',
      render: (_: any, record: TimeLog) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/timelogs/${record.id}/edit`)} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Time Logs</Title>
        <Link to="/timelogs/new">
          <Button type="primary">Create New Time Log</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={timeLogs} loading={loading} rowKey="id" />
    </div>
  );
};

export default TimeLogPage;
