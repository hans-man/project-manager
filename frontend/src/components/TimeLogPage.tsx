import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from 'react-data-table-component';

interface TimeLog {
  id: number;
  hours: number;
  date: string;
  taskId: number;
  userId: number;
}

const TimeLogPage: React.FC = () => {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchTimeLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/timelogs');
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
        await axios.delete(`http://localhost:3001/timelogs/${id}`);
        fetchTimeLogs(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting time log:', error);
      }
    }
  };

  const columns = [
    { name: "ID", selector: (row: TimeLog) => row.id, sortable: true, width: '70px' },
    { name: "시간", selector: (row: TimeLog) => row.hours, sortable: true },
    { name: "날짜", selector: (row: TimeLog) => new Date(row.date).toLocaleDateString(), sortable: true },
    { name: "태스크 ID", selector: (row: TimeLog) => row.taskId, sortable: true },
    { name: "사용자 ID", selector: (row: TimeLog) => row.userId, sortable: true },
    {
      name: "작업",
      button: true,
      cell: (row: TimeLog) => (
        <>
          <IconButton onClick={() => navigate(`/timelogs/${row.id}/edit`)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Time Logs
      </Typography>
      <Button component={Link} to="/timelogs/new" variant="contained" sx={{ mb: 2 }}>
        Create New Time Log
      </Button>
      <Box sx={{ width: '100%', mt: 2 }}>
        <DataTable
          columns={columns}
          data={timeLogs}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
        />
      </Box>
    </Box>
  );
};

export default TimeLogPage;
