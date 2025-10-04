import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

// Matching backend entities
interface Project {
  id: number;
  name: string;
}
interface Author {
  id: number;
  name: string;
}

interface IWikiPage {
  id: number;
  title: string;
  content: string;
  project: Project;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

const WikiPage: React.FC = () => {
  const [wikiPages, setWikiPages] = useState<IWikiPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a: IWikiPage, b: IWikiPage) => a.id - b.id },
    { title: '제목', dataIndex: 'title', key: 'title' },
    { title: '프로젝트', dataIndex: ['project', 'name'], key: 'projectName' },
    { title: '작성자', dataIndex: ['author', 'name'], key: 'authorName' },
    { title: '생성일', dataIndex: 'createdAt', key: 'createdAt', render: (date: string) => new Date(date).toLocaleDateString() },
    {
      title: '보기',
      key: 'action',
      render: (_: any, record: IWikiPage) => (
        <Button onClick={() => navigate(`/wiki/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchWikiPages = async () => {
      try {
        const response = await api.get('/wikis');
        setWikiPages(response.data);
      } catch (error) {
        console.error('Error fetching wiki pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWikiPages();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Wiki</Title>
        <Link to="/wiki/new">
          <Button type="primary">Create New Wiki Page</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={wikiPages} loading={loading} rowKey="id" />
    </div>
  );
};

export default WikiPage;