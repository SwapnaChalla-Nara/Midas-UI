import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Tabs, Tab } from '@mui/material';
import { theme } from './theme';
import { Layout } from './components';
import { SearchPage, ResultsPage } from './pages';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
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
            <Tab label="Search" />
            <Tab label="Results" />
          </Tabs>
        </Box>
        
        {currentTab === 0 && <SearchPage />}
        {currentTab === 1 && <ResultsPage />}
      </Layout>
    </ThemeProvider>
  );
}

export default App;