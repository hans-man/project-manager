import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper, Button } from '@mui/material';

interface WikiPage {
  id: number;
  title: string;
  content: string;
}

const WikiPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wikiPage, setWikiPage] = useState<WikiPage | null>(null);

  useEffect(() => {
    const fetchWikiPage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/wikis/${id}`);
        setWikiPage(response.data);
      } catch (error) {
        console.error('Error fetching wiki page:', error);
      }
    };

    if (id) {
      fetchWikiPage();
    }
  }, [id]);

  if (!wikiPage) {
    return <Typography>Loading wiki page...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {wikiPage.title}
      </Typography>
      <Button component={Link} to={`/wiki/${wikiPage.id}/edit`} variant="contained" sx={{ mb: 2, mr: 2 }}>
        Edit Wiki Page
      </Button>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="body1">
          {wikiPage.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default WikiPageDetail;
