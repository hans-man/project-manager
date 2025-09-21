import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Project {
  id: number;
  name: string;
  description?: string;
  budget?: number;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/projects/${id}`);
      fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Button component={Link} to="/projects/new" variant="contained" sx={{ mb: 2 }}>
        Create New Project
      </Button>
      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" component={Link} to={`/projects/${project.id}/edit`}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={project.name} secondary={project.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProjectPage;
