import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Alert,
  Grid,
  Card,
  CardContent,
  Button, // Button 컴포넌트 임포트
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

interface Issue {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: string;
  assignee: string;
  reporter: string;
  created_at: string;
  updated_at: string;
}

const IssueList = ({ token }: { token: string }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/issues', {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming token is needed for issues as well
          },
        });
        setIssues(Array.isArray(response.data.data) ? response.data.data : []);
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

  if (loading) {
    return (
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Typography>이슈 로딩 중...</Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
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
        {/* 이슈 등록 버튼 추가 */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/issues/new')} // /issues/new 경로로 이동
          sx={{ mb: 3 }}
        >
          새 이슈 등록
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        {issues.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {issues.map((issue) => (
              <Grid item xs={12} sm={6} md={4} key={issue.id}>
                <Card variant="elevation" elevation={3} sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                      {issue.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">\n                      상태: {issue.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">\n                      담당자: {issue.assignee}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">\n                      보고자: {issue.reporter}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">\n                      생성일: {new Date(issue.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          !error && <Typography sx={{ mt: 2 }}>이슈를 찾을 수 없거나 로딩 중입니다...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default IssueList;
