import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from 'react-data-table-component';

interface Project {
  id: number;
  name: string;
  description?: string;
  budget?: number;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:3001/projects/${id}`);
        fetchProjects(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const columns = [
    { name: "ID", selector: (row: Project) => row.id, sortable: true, width: '70px' },
    { name: "이름", selector: (row: Project) => row.name, sortable: true },
    { name: "설명", selector: (row: Project) => row.description || '', sortable: true },
    { name: "예산", selector: (row: Project) => row.budget || 0, sortable: true, format: (row: Project) => `${row.budget || 0}` },
    {
      name: "작업",
      button: true,
      cell: (row: Project) => (
        <>
          <IconButton onClick={() => navigate(`/projects/${row.id}/edit`)} size="small">
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
        Projects
      </Typography>
      <Button component={Link} to="/projects/new" variant="contained" sx={{ mb: 2 }}>
        Create New Project
      </Button>
      <Box sx={{ width: '100%', mt: 2 }}>
        <DataTable
          columns={columns}
          data={projects}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
        />
      </Box>
    </Box>
  );
};

export default ProjectPage;
