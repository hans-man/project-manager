import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ProjectFormProps {
  project?: {
    id: number;
    name: string;
    description?: string;
    budget?: number;
    ownerId: number;
  };
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [budget, setBudget] = useState(project?.budget || 0);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (project) {
        // Update existing project
        await axios.patch(`http://localhost:3001/projects/${project.id}`, {
          name,
          description,
          budget,
        });
      } else {
        // Create new project
        // For now, hardcode ownerId
        await axios.post('http://localhost:3001/projects', {
          name,
          description,
          budget,
          ownerId: 1, // TODO: Replace with actual owner ID
        });
      }
      navigate('/projects');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {project ? 'Edit Project' : 'Create New Project'}
      </Typography>
      <TextField
        label="Project Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <TextField
        label="Budget"
        variant="outlined"
        fullWidth
        type="number"
        value={budget}
        onChange={(e) => setBudget(parseFloat(e.target.value))}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        {project ? 'Update Project' : 'Create Project'}
      </Button>
    </Box>
  );
};

export default ProjectForm;
