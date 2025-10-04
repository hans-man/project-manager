import React, { useState, useEffect } from 'react';







import ProgramListRoutes from './features/program-list/ProgramListRoutes';
import ProgramColumnNameRoutes from './features/program-column-name/ProgramColumnNameRoutes';
import UsersRoutes from './features/users/UsersRoutes';
import WikiRoutes from './features/wiki/WikiRoutes';
import TimeLogsRoutes from './features/timelogs/TimeLogsRoutes';
import ProjectsRoutes from './features/projects/ProjectsRoutes';
import InstanceCodesRoutes from './features/instance-codes/InstanceCodesRoutes';
import DashboardRoutes from './features/dashboard/DashboardRoutes';
import KanbanRoutes from './features/kanban/KanbanRoutes';
import IssuesRoutes from './features/issues/IssuesRoutes';






import MainLayout from './components/MainLayout'; // Import MainLayout component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

import Login from './components/Login';
import SignUp from './components/SignUp'; // Import SignUp component
import { CssBaseline, Box } from '@mui/material';

// Date Picker 관련 임포트
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



interface DecodedToken {
  sub: number; // Use 'sub' as the user ID property
  // Add other properties if your token contains them
}

function App() {
  console.log('App component rendered'); // Top-level log to check if App renders
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken: DecodedToken = jwtDecode(storedToken);
        if (decodedToken && decodedToken.sub) {
          setCurrentUserId(decodedToken.sub);
          console.log('App.tsx useEffect - currentUserId set to:', decodedToken.sub); // Added console.log
        } else {
          console.error('Decoded token is missing the SUB property:', decodedToken);
          setToken(null);
          localStorage.removeItem('jwtToken');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setToken(null);
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  const handleLoginSuccess = (receivedToken: string) => {
    setToken(receivedToken);
    localStorage.setItem('jwtToken', receivedToken);
    try {
      const decodedToken: DecodedToken = jwtDecode(receivedToken);
      if (decodedToken && decodedToken.sub) {
        setCurrentUserId(decodedToken.sub);
        console.log('App.tsx handleLoginSuccess - currentUserId set to:', decodedToken.sub); // Added console.log
      } else {
        console.error('Decoded token after login is missing the SUB property:', decodedToken);
        setToken(null);
        localStorage.removeItem('jwtToken');
      }
    } catch (error) {
      console.error('Error decoding token after login:', error);
      setToken(null);
      localStorage.removeItem('jwtToken');
    }
    alert('로그인 성공! 토큰 저장됨.');
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUserId(undefined);
    localStorage.removeItem('jwtToken');
    alert('로그아웃되었습니다.');
  };

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}> {/* LocalizationProvider 추가 */}
        <Routes>
          {token ? (
            <Route path="/*" element={
              <MainLayout handleLogout={handleLogout} token={token}>
                <Routes>
                  <Route path="/" element={<DashboardRoutes />} />
                  <Route path="/board/*" element={<KanbanRoutes token={token} />} />
                  <Route path="/issues/*" element={<IssuesRoutes token={token} />} />
                  <Route path="/program-list/*" element={<ProgramListRoutes />} />
                  <Route path="/program-column-name/*" element={<ProgramColumnNameRoutes />} />
                  <Route path="/users/*" element={<UsersRoutes token={token} />} />
                  <Route path="/wiki/*" element={<WikiRoutes />} />
                  <Route path="/timelogs/*" element={<TimeLogsRoutes />} />


                  <Route path="/projects/*" element={<ProjectsRoutes currentUserId={currentUserId} token={token} />} />
                  <Route path="/instance-codes/*" element={<InstanceCodesRoutes token={token} />} />
                </Routes>
              </MainLayout>
            } />
          ) : (
            <Route path="/*" element={
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Routes>
                  <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} /> {/* Default to login */}
                </Routes>
              </Box>
            } />
          )}
        </Routes>
      </LocalizationProvider> {/* LocalizationProvider 닫기 */}
    </Router>
  );
}

export default App;