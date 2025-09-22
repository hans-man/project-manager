import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface ProjectFormProps {
  currentUserId?: number; // Add currentUserId as an optional prop
}

const ProjectForm: React.FC<ProjectFormProps> = ({ currentUserId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<number>(0); // Ensure budget is always a number
  const [ownerId, setOwnerId] = useState<number | undefined>(currentUserId); // Initialize as undefined

  useEffect(() => {
    if (id) {
      // Fetch project data for editing
      const fetchProject = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/projects/${id}`);
          const projectData = response.data;
          setName(projectData.name);
          setDescription(projectData.description || '');
          setBudget(parseFloat(projectData.budget || '0')); // Parse budget to float, default to 0
          setOwnerId(projectData.owner?.id); // Correctly extract owner.id
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    } else {
      // For new projects, ensure ownerId is set from currentUserId prop
      setOwnerId(currentUserId);
    }
  }, [id, currentUserId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ownerId) {
      console.error('Owner ID is missing. Cannot save project.');
      return;
    }
    try {
      if (id) {
        // Update existing project
        await axios.patch(`http://localhost:3001/projects/${id}`, {
          name,
          description,
          budget,
          ownerId,
        });
      } else {
        // Create new project
        await axios.post('http://localhost:3001/projects', {
          name,
          description,
          budget,
          ownerId,
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
        {id ? 'Edit Project' : 'Create New Project'}
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
        onChange={(e) => setBudget(e.target.value === '' ? 0 : parseFloat(e.target.value))}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Project' : 'Create Project'}
      </Button>
    </Box>
  );
};

export default ProjectForm;
