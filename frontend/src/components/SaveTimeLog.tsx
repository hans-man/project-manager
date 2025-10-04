import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface TimeLogFormProps {
  timeLog?: {
    id: number;
    hours: number;
    date: string;
    taskId: number;
    userId: number;
  };
}

const TimeLogForm: React.FC<TimeLogFormProps> = ({ timeLog }) => {
  const [hours, setHours] = useState(timeLog?.hours || 0);
  const [date, setDate] = useState(timeLog?.date || new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (timeLog) {
        // Update existing time log
        await api.patch(`/timelogs/${timeLog.id}`, {
          hours,
          date,
        });
      } else {
        // Create new time log
        // For now, hardcode taskId and userId
        await api.post('/timelogs', {
          hours,
          date,
          taskId: 1, // TODO: Replace with actual task ID
          userId: 1, // TODO: Replace with actual user ID
        });
      }
      navigate('/timelogs');
    } catch (error) {
      console.error('Error saving time log:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card elevation={3} sx={{ p: 2, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {timeLog ? 'Edit Time Log' : 'Create New Time Log'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="시간"
              variant="outlined"
              fullWidth
              type="number"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="날짜"
              variant="outlined"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              {timeLog ? 'Update Time Log' : 'Create Time Log'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TimeLogForm;
