import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Pagination,
  Button,
} from '@mui/material';
import { Article as ArticleIcon, Image as ImageIcon, Map as MapIcon } from '@mui/icons-material';

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    title: 'Presidential Proclamation - National Archive Day',
    description: 'Proclamation establishing the annual observance of National Archive Day to recognize the importance of preserving historical records.',
    date: '1995-10-15',
    type: 'Document',
    recordId: 'NARA-1995-PA-001',
    collection: 'Presidential Proclamations',
  },
  {
    id: 2,
    title: 'Photograph: White House Conference on Education',
    description: 'Black and white photograph showing participants at the White House Conference on Education.',
    date: '1965-07-20',
    type: 'Photograph',
    recordId: 'NARA-1965-PH-0284',
    collection: 'White House Photography',
  },
  {
    id: 3,
    title: 'Map: United States Territorial Acquisitions',
    description: 'Detailed map showing the territorial expansion of the United States from 1783 to 1853.',
    date: '1853-12-30',
    type: 'Map',
    recordId: 'NARA-1853-MAP-047',
    collection: 'Historical Maps',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'Photograph':
      return <ImageIcon />;
    case 'Map':
      return <MapIcon />;
    default:
      return <ArticleIcon />;
  }
};

const getTypeColor = (type: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
  switch (type) {
    case 'Photograph':
      return 'info';
    case 'Map':
      return 'warning';
    default:
      return 'primary';
  }
};

export const ResultsPage: React.FC = () => {
  return (
    <Box>
      {/* Results Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found 1,247 records matching your search criteria
        </Typography>
      </Box>

      {/* Filter/Sort Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ mr: 1, alignSelf: 'center' }}>
              Filter by:
            </Typography>
            <Chip 
              label="Documents" 
              variant="outlined" 
              clickable 
              sx={{ '&:focus': { outline: '2px solid', outlineColor: 'primary.main' } }}
            />
            <Chip 
              label="Photographs" 
              variant="outlined" 
              clickable 
              sx={{ '&:focus': { outline: '2px solid', outlineColor: 'primary.main' } }}
            />
            <Chip 
              label="Maps" 
              variant="outlined" 
              clickable 
              sx={{ '&:focus': { outline: '2px solid', outlineColor: 'primary.main' } }}
            />
          </Box>
          <Button 
            variant="outlined" 
            size="small"
            sx={{ '&:focus': { outline: '2px solid', outlineColor: 'primary.main' } }}
          >
            Sort by Relevance
          </Button>
        </Box>
      </Paper>

      {/* Results List */}
      <Paper elevation={1}>
        <List disablePadding>
          {mockResults.map((result, index) => (
            <React.Fragment key={result.id}>
              <ListItem 
                sx={{ 
                  py: 3,
                  '&:hover': { 
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                  '&:focus-within': {
                    bgcolor: 'action.selected',
                  },
                }}
                role="article"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    console.log('Open record:', result.recordId);
                  }
                }}
              >
                <Box sx={{ mr: 2, color: 'primary.main' }}>
                  {getIcon(result.type)}
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {result.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          label={result.type} 
                          color={getTypeColor(result.type)}
                          size="small" 
                        />
                        <Chip 
                          label={result.date} 
                          variant="outlined" 
                          size="small" 
                        />
                        <Chip 
                          label={result.recordId} 
                          variant="outlined" 
                          size="small" 
                        />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {result.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Collection: {result.collection}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < mockResults.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={42} 
          page={1} 
          color="primary"
          size="large"
          showFirstButton 
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};