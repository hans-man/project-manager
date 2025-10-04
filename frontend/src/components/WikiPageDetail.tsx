import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

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
        const response = await api.get(`/wikis/${id}`);
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
      <Card elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="body1">
            {wikiPage.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WikiPageDetail;
