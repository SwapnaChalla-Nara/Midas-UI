import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Tabs, Tab } from '@mui/material';
import { theme } from './theme';
import { Layout } from './components';
import { SearchPage, ResultsPage } from './pages';
import { SearchResponse } from './types/search';

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSearchComplete = (results: SearchResponse) => {
    setSearchResponse(results);
    // Automatically switch to results tab when search completes
    setCurrentTab(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            aria-label="MiDAS application pages"
            sx={{
              '& .MuiTab-root': {
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              },
            }}
          >
            <Tab label="Name Index Search" />
            <Tab 
              label={`Search Results${searchResponse ? ` (${searchResponse.totalCount.toLocaleString()})` : ''}`}
              disabled={!searchResponse}
            />
          </Tabs>
        </Box>
        
        {currentTab === 0 && (
          <SearchPage 
            onSearchComplete={handleSearchComplete} 
          />
        )}
        {currentTab === 1 && (
          <ResultsPage 
            searchResponse={searchResponse}
          />
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;