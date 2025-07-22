import React from 'react';
import { Box } from '@mui/material';
import { SearchResultsDataGrid } from '../components';
import { SearchResponse, SearchResult } from '../types/search';

interface ResultsPageProps {
  searchResponse?: SearchResponse | null;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ 
  searchResponse = null
}) => {
  const handleRowClick = (result: SearchResult) => {
    // TODO: Implement navigation to detailed record view
    console.log('View record details:', result);
  };

  return (
    <Box>
      <SearchResultsDataGrid
        searchResponse={searchResponse}
        onRowClick={handleRowClick}
      />
    </Box>
  );
};