import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { NameIndexSearchForm } from '../components';
import { SearchFormData, SearchResponse } from '../types/search';
import { searchNameIndex } from '../services/searchApi';

interface SearchPageProps {
  onSearchComplete?: (results: SearchResponse) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSearchComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (formData: SearchFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchNameIndex(formData);
      
      // Call the callback to update results in parent component
      if (onSearchComplete) {
        onSearchComplete(results);
      }
      
      console.log('Search completed:', results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during search';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
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
          Name Index Search
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}
        >
          Search the Master Index and Flexoline name indices to discover historical records 
          and military personnel information from the National Archives.
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, maxWidth: 900, mx: 'auto' }}>
          {error}
        </Alert>
      )}

      {/* Search Form */}
      <NameIndexSearchForm onSearch={handleSearch} loading={loading} />

      {/* Quick Start Guide */}
      <Box sx={{ mb: 4, mt: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Search Guide
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Master Index
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Search general historical records, documents, and archival materials. 
                Includes names, locations, subjects, and various record types from the National Archives.
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Flexoline Index
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specialized search for military personnel records. Find information about 
                service members including names, birth details, military units, and service history.
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Search Tips
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use wildcards (*) for partial matches, "OR" for multiple terms, and select 
                specific fields to narrow your search. Results are displayed in an interactive grid.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};