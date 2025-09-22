import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface IWikiPage {
  id: number;
  title: string;
}

const WikiPage: React.FC = () => {
  const [wikiPages, setWikiPages] = useState<IWikiPage[]>([]);

  useEffect(() => {
    const fetchWikiPages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/wikis');
        setWikiPages(response.data);
      } catch (error) {
        console.error('Error fetching wiki pages:', error);
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
      <List>
        {wikiPages.map((page) => (
          <ListItem key={page.id} component={Link} to={`/wiki/${page.id}`}>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WikiPage;
