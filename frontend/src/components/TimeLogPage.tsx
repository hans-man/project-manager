import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Changed imports

interface TimeLog {
  id: number;
  hours: number;
  date: string;
  taskId: number;
  userId: number;
}

const TimeLogPage: React.FC = () => {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);

  const fetchTimeLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/timelogs');
      setTimeLogs(response.data);
    } catch (error) {
      console.error('Error fetching time logs:', error);
    }
  };

  useEffect(() => {
    fetchTimeLogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/timelogs/${id}`);
      fetchTimeLogs(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting time log:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Time Logs
      </Typography>
      <Button component={Link} to="/timelogs/new" variant="contained" sx={{ mb: 2 }}>
        Create New Time Log
      </Button>
      <List>
        {timeLogs.map((log) => (
          <ListItem
            key={log.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" component={Link} to={`/timelogs/${log.id}/edit`}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(log.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={`Hours: ${log.hours}, Date: ${log.date}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TimeLogPage;
