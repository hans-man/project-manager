import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography, Card, CardContent, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

interface ProgramColumnNameFormProps {
  // No props needed as data is fetched via useParams
}

const SaveProgramColumnName: React.FC<ProgramColumnNameFormProps> = () => {
  const { projectId, columnId } = useParams<{ projectId: string; columnId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    projectId: projectId ? parseInt(projectId) : '',
    columnId: columnId || '',
    columnName: '',
    tableConfig: '{}',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (projectId && columnId) {
      const fetchColumnName = async () => {
        try {
          const response = await api.get(`/program-column-name/${projectId}/${columnId}`);
          setFormData({
            projectId: response.data.projectId,
            columnId: response.data.columnId,
            columnName: response.data.columnName,
            tableConfig: JSON.stringify(response.data.tableConfig || {}, null, 2),
          });
        } catch (error) {
          console.error('Error fetching column name:', error);
          setMessage('Failed to fetch column name.');
        }
      };
      fetchColumnName();
    }
  }, [projectId, columnId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        tableConfig: JSON.parse(formData.tableConfig),
      };

      if (projectId && columnId) {
        await api.patch(`/program-column-name/${projectId}/${columnId}`, dataToSend);
      } else {
        await api.post('/program-column-name', dataToSend);
      }
      navigate('/program-column-name');
    } catch (error) {
      setMessage('Failed to save column name.');
      console.error('Error saving column name:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card elevation={3} sx={{ p: 2, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {projectId && columnId ? 'Edit Column Name' : 'Create New Column Name'}
          </Typography>
          {message && <Alert severity={message.includes('Failed') ? 'error' : 'success'} sx={{ mt: 2, width: '100%' }}>{message}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Project ID"
              variant="outlined"
              fullWidth
              name="projectId"
              type="number"
              value={formData.projectId}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
              disabled={!!(projectId && columnId)}
            />
            <TextField
              label="Column ID"
              variant="outlined"
              fullWidth
              name="columnId"
              value={formData.columnId}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
              disabled={!!(projectId && columnId)}
            />
            <TextField
              label="Column Name"
              variant="outlined"
              fullWidth
              name="columnName"
              value={formData.columnName}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Table Config (JSON)"
              variant="outlined"
              fullWidth
              name="tableConfig"
              multiline
              rows={4}
              value={formData.tableConfig}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate('/program-column-name')} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SaveProgramColumnName;
