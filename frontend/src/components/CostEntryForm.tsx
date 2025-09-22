import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CostEntryFormProps {
  costEntry?: {
    id: number;
    amount: number;
    date: string;
    description?: string;
    taskId: number;
    userId: number;
  };
}

const CostEntryForm: React.FC<CostEntryFormProps> = ({ costEntry }) => {
  const [amount, setAmount] = useState(costEntry?.amount || 0);
  const [date, setDate] = useState(costEntry?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(costEntry?.description || '');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (costEntry) {
        // Update existing cost entry
        await axios.patch(`http://localhost:3001/costentries/${costEntry.id}`, {
          amount,
          date,
          description,
        });
      } else {
        // Create new cost entry
        // For now, hardcode taskId and userId
        await axios.post('http://localhost:3001/costentries', {
          amount,
          date,
          description,
          taskId: 1, // TODO: Replace with actual task ID
          userId: 1, // TODO: Replace with actual user ID
        });
      }
      navigate('/costentries');
    } catch (error) {
      console.error('Error saving cost entry:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {costEntry ? 'Edit Cost Entry' : 'Create New Cost Entry'}
      </Typography>
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Date"
        variant="outlined"
        fullWidth
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        {costEntry ? 'Update Cost Entry' : 'Create Cost Entry'}
      </Button>
    </Box>
  );
};

export default CostEntryForm;
