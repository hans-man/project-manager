import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface CostEntry {
  id: number;
  amount: number;
  date: string;
  description?: string;
  taskId: number;
  userId: number;
}

const CostEntryPage: React.FC = () => {
  const [costEntries, setCostEntries] = useState<CostEntry[]>([]);

  const fetchCostEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/costentries');
      setCostEntries(response.data);
    } catch (error) {
      console.error('Error fetching cost entries:', error);
    }
  };

  useEffect(() => {
    fetchCostEntries();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/costentries/${id}`);
      fetchCostEntries(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting cost entry:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cost Entries
      </Typography>
      <Button component={Link} to="/costentries/new" variant="contained" sx={{ mb: 2 }}>
        Create New Cost Entry
      </Button>
      <List>
        {costEntries.map((entry) => (
          <ListItem
            key={entry.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" component={Link} to={`/costentries/${entry.id}/edit`}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entry.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={`Amount: ${entry.amount}, Date: ${entry.date}, Description: ${entry.description || 'N/A'}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CostEntryPage;
