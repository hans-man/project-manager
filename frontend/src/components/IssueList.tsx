import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Alert,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

// Backend `Issue` entity와 `Project` entity 구조에 맞게 인터페이스 수정
interface Project {
  id: number;
  name: string;
}

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  project: Project; // project_id 대신 project 객체
  assigneeName: string; // assignee 대신 assigneeName
  createdAt: string; // created_at 대신 createdAt (BaseEntity 기준)
  updatedAt: string; // updated_at 대신 updatedAt (BaseEntity 기준)
}

const IssueList = ({ token }: { token: string }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const columns = [
    { name: "ID", selector: (row: Issue) => row.id, sortable: true, width: '70px' },
    { name: "제목", selector: (row: Issue) => row.title, sortable: true },
    { name: "프로젝트", selector: (row: Issue) => row.project.name, sortable: true },
    { name: "상태", selector: (row: Issue) => row.status, sortable: true },
    { name: "담당자", selector: (row: Issue) => row.assigneeName, sortable: true },
    {
      name: "생성일",
      selector: (row: Issue) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/issues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

    if (token) {
      fetchIssues();
    } else {
      setLoading(false);
      setError('인증 토큰이 없습니다.');
    }
  }, [token]);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom sx={{ mb: 3 }}>
          프로젝트 이슈
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/issues/new')}
          sx={{ mb: 3, alignSelf: 'flex-end' }}
        >
          새 이슈 등록
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        
        <Box sx={{ width: '100%', mt: 2 }}>
          <DataTable
            columns={columns}
            data={issues}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
          />
        </Box>
      </Box>
    </Container>
  );
};

export default IssueList;
