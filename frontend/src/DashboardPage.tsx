import React, { useState, useEffect } from 'react';
import api from './services/api';
import { API_BASE_URL } from './config/api';
import {
  Box,
  Typography,
  Container,
  Alert,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

interface DashboardStatsDto {
  totalUsers: number;
  totalProjects: number;
  totalIssues: number;
  totalTimeLogs: number;
  totalCostEntries: number;
  totalInstanceCodes: number;

  projectsByStatus: { status: string; count: number }[];
  issuesByStatus: { status: string; count: number }[];
  issuesByPriority: { priority: string; count: number }[];
  timeLogsByUser: { userName: string; totalHours: number }[];
  costEntriesByProject: { projectName: string; totalCost: number }[];
}

interface DashboardPageProps {
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStatsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {

      try {
        setLoading(true);
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || '대시보드 통계 정보를 가져오는 데 실패했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!stats) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">표시할 통계 정보가 없습니다.</Alert>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom sx={{ mb: 4 }}>
        대시보드
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}> {/* Replaced Grid container with Box */}
        {/* Total Counts Section */}
        <Box sx={{ width: '100%', px: 1.5, mb: 3 }}> {/* Replaced Grid item xs={12} */}
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            개요
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}> {/* Replaced Nested Grid for total counts */}
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
              <Card elevation={2} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    총 사용자
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalUsers}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
              <Card elevation={2} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    총 프로젝트
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalProjects}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
              <Card elevation={2} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    총 이슈
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalIssues}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
              <Card elevation={2} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    총 시간 기록
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalTimeLogs}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
              <Card elevation={2} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    총 비용 항목
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalCostEntries}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
              <Card elevation={2} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    총 인스턴스 코드
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stats.totalInstanceCodes}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* Projects by Status */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
          <Card elevation={2} sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                프로젝트 현황
              </Typography>
              {/* Placeholder for a chart, e.g., Pie Chart */}
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: '4px' }}>
                <Typography variant="body2" color="text.secondary">차트 영역 (예: 파이 차트)</Typography>
              </Box>
              <List dense sx={{ mt: 2 }}>
                {stats.projectsByStatus.map((item, index) => (
                  <React.Fragment key={item.status}>
                    <ListItem>
                      <ListItemText
                        primary={item.status}
                        secondary={`(${item.count} 건)`}
                      />
                    </ListItem>
                    {index < stats.projectsByStatus.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Issues by Status */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
          <Card elevation={2} sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                이슈 현황
              </Typography>
              {/* Placeholder for a chart, e.g., Bar Chart */}
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: '4px' }}>
                <Typography variant="body2" color="text.secondary">차트 영역 (예: 막대 차트)</Typography>
              </Box>
              <List dense sx={{ mt: 2 }}>
                {stats.issuesByStatus.map((item, index) => (
                  <React.Fragment key={item.status}>
                    <ListItem>
                      <ListItemText
                        primary={item.status}
                        secondary={`(${item.count} 건)`}
                      />
                    </ListItem>
                    {index < stats.issuesByStatus.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Issues by Priority */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
          <Card elevation={2} sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                이슈 우선순위
              </Typography>
              {/* Placeholder for a chart, e.g., Donut Chart */}
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: '4px' }}>
                <Typography variant="body2" color="text.secondary">차트 영역 (예: 도넛 차트)</Typography>
              </Box>
              <List dense sx={{ mt: 2 }}>
                {stats.issuesByPriority.map((item, index) => (
                  <React.Fragment key={item.priority}>
                    <ListItem>
                      <ListItemText
                        primary={item.priority}
                        secondary={`(${item.count} 건)`}
                      />
                    </ListItem>
                    {index < stats.issuesByPriority.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Time Logs by User */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
          <Card elevation={2} sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                사용자별 시간 기록
              </Typography>
              {/* Placeholder for a chart, e.g., Bar Chart */}
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: '4px' }}>
                <Typography variant="body2" color="text.secondary">차트 영역 (예: 막대 차트)</Typography>
              </Box>
              <List dense sx={{ mt: 2 }}>
                {Array.isArray(stats.timeLogsByUser) && stats.timeLogsByUser.map((item, index) => (
                  <React.Fragment key={item.userName}>
                    <ListItem>
                      <ListItemText
                        primary={item.userName}
                        secondary={`(${item.totalHours} 시간)`}
                      />
                    </ListItem>
                    {index < stats.timeLogsByUser.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Cost Entries by Project */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, px: 1.5, mb: 3 }}> {/* Replaced Grid item */}
          <Card elevation={2} sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                프로젝트별 비용 항목
              </Typography>
              {/* Placeholder for a chart, e.g., Bar Chart */}
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: '4px' }}>
                <Typography variant="body2" color="text.secondary">차트 영역 (예: 막대 차트)</Typography>
              </Box>
              <List dense sx={{ mt: 2 }}>
                {Array.isArray(stats.costEntriesByProject) && stats.costEntriesByProject.map((item, index) => (
                  <React.Fragment key={item.projectName}>
                    <ListItem>
                      <ListItemText
                        primary={item.projectName}
                        secondary={`(${item.totalCost} 원)`}
                      />
                    </ListItem>
                    {index < stats.costEntriesByProject.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
