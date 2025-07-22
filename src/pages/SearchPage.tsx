import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <Box>
      {/* Search Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ 
            fontWeight: 400,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Search National Archives Records
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Discover millions of records from the National Archives and Records Administration.
          Search historical documents, photographs, maps, and more.
        </Typography>
      </Box>

      {/* Search Form */}
      <Paper
        elevation={2}
        sx={{ p: 3, mb: 4, maxWidth: 800, mx: 'auto' }}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'flex-end' },
          }}
        >
          <TextField
            fullWidth
            label="Search records..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter keywords, names, places, or topics"
            sx={{ flexGrow: 1 }}
            inputProps={{
              'aria-label': 'Search records',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              minWidth: 120,
              height: 56,
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {/* Quick Start Guide */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          How to Search
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Search
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter keywords related to people, places, events, or topics you're researching.
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Advanced Filters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use filters to narrow results by date range, record type, or location.
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Browse Collections
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore curated collections of records organized by theme or subject.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};