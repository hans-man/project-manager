import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

interface IWikiPage {
  id: number;
  title: string;
}

const WikiPage: React.FC = () => {
  const [wikiPages, setWikiPages] = useState<IWikiPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const columns = [
    { name: "ID", selector: (row: IWikiPage) => row.id, sortable: true, width: '70px' },
    { name: "제목", selector: (row: IWikiPage) => row.title, sortable: true },
    {
      name: "보기",
      button: true,
      cell: (row: IWikiPage) => (
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => navigate(`/wiki/${row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchWikiPages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/wikis');
        setWikiPages(response.data);
      } catch (error) {
        console.error('Error fetching wiki pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWikiPages();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Wiki
      </Typography>
      <Button component={Link} to="/wiki/new" variant="contained" sx={{ mb: 2 }}>
        Create New Wiki Page
      </Button>
      <Box sx={{ width: '100%', mt: 2 }}>
        <DataTable
          columns={columns}
          data={wikiPages}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
        />
      </Box>
    </Box>
  );
};

export default WikiPage;