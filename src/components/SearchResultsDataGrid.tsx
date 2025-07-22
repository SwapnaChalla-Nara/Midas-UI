import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Alert,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { 
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { SearchResponse, SearchResult, getFieldsForIndex } from '../types/search';

interface SearchResultsDataGridProps {
  searchResponse: SearchResponse | null;
  loading?: boolean;
  onRowClick?: (result: SearchResult) => void;
}

// Custom toolbar component
const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter sx={{ flex: 1 }} />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export const SearchResultsDataGrid: React.FC<SearchResultsDataGridProps> = ({
  searchResponse,
  loading = false,
  onRowClick,
}) => {
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>({});

  // Generate columns based on the search response
  const columns: GridColDef[] = useMemo(() => {
    if (!searchResponse || searchResponse.results.length === 0) return [];

    const baseColumns: GridColDef[] = [
      {
        field: 'recordId',
        headerName: 'Record ID',
        width: 150,
        sortable: true,
        filterable: true,
      },
    ];

    // Get available fields for the current index type
    const availableFields = getFieldsForIndex(searchResponse.indexType);
    
    // Add columns for each search field that has data
    const searchFieldColumns: GridColDef[] = searchResponse.searchFields.map((fieldName) => {
      const fieldInfo = availableFields.find(f => f.name === fieldName);
      return {
        field: fieldName,
        headerName: fieldInfo?.label || fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
        width: 200,
        sortable: true,
        filterable: true,
        renderCell: (params) => (
          <Box sx={{ 
            whiteSpace: 'normal', 
            wordWrap: 'break-word',
            py: 1 
          }}>
            {params.value || '-'}
          </Box>
        ),
      };
    });

    // Add additional common columns that might be in the results
    const additionalColumns: GridColDef[] = [];
    
    // Check if results have common fields and add them
    if (searchResponse.results.some(result => 'date' in result)) {
      additionalColumns.push({
        field: 'date',
        headerName: 'Date',
        width: 120,
        sortable: true,
        filterable: true,
      });
    }

    if (searchResponse.results.some(result => 'collection' in result)) {
      additionalColumns.push({
        field: 'collection',
        headerName: 'Collection',
        width: 180,
        sortable: true,
        filterable: true,
      });
    }

    return [...baseColumns, ...searchFieldColumns, ...additionalColumns];
  }, [searchResponse]);

  // Initialize column visibility when columns change
  React.useEffect(() => {
    if (columns.length > 0) {
      const initialVisibility = columns.reduce((acc, col) => {
        acc[col.field] = true; // All columns visible by default
        return acc;
      }, {} as { [key: string]: boolean });
      setColumnVisibility(initialVisibility);
    }
  }, [columns]);

  const handleColumnVisibilityChange = (field: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const visibleColumns = columns.filter(col => columnVisibility[col.field]);

  if (!searchResponse) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Enter search criteria and click "Search" to view results
        </Typography>
      </Box>
    );
  }

  if (searchResponse.results.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            No results found
          </Typography>
          <Typography variant="body2">
            No records were found matching your search criteria. Try:
          </Typography>
          <ul>
            <li>Using different search terms</li>
            <li>Adding wildcards (*) for broader matches</li>
            <li>Selecting additional search fields</li>
            <li>Trying the other index (Master Index or Flexoline)</li>
          </ul>
        </Alert>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Search Details:</strong>
            <br />Index: {searchResponse.indexType === 'master' ? 'Master Index' : 'Flexoline'}
            <br />Query: "{searchResponse.searchQuery}"
            <br />Fields searched: {searchResponse.searchFields.join(', ')}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Results Summary */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6">
              Search Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Found {searchResponse.totalCount.toLocaleString()} records in {' '}
              <Chip 
                label={searchResponse.indexType === 'master' ? 'Master Index' : 'Flexoline'} 
                size="small" 
                color="primary"
              />
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Query: "{searchResponse.searchQuery}"
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Column Visibility Controls */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VisibilityIcon fontSize="small" />
            <Typography variant="subtitle2">
              Column Visibility ({visibleColumns.length} of {columns.length} visible)
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {columns.map((column) => (
              <FormControlLabel
                key={column.field}
                control={
                  <Switch
                    checked={columnVisibility[column.field] || false}
                    onChange={() => handleColumnVisibilityChange(column.field)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    {column.headerName}
                  </Typography>
                }
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Data Grid */}
      <Paper elevation={1} sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={searchResponse.results}
          columns={visibleColumns}
          loading={loading}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          onRowClick={onRowClick ? (params) => onRowClick(params.row) : undefined}
          disableRowSelectionOnClick
          pagination
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': {
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'action.hover',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'action.hover',
              cursor: onRowClick ? 'pointer' : 'default',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '-2px',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '-2px',
            },
          }}
        />
      </Paper>

      {/* Additional Info */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Showing {Math.min(searchResponse.pageSize, searchResponse.results.length)} of {searchResponse.totalCount.toLocaleString()} results
          {searchResponse.totalCount > searchResponse.results.length && 
            ` • Use pagination controls above to view more results`
          }
        </Typography>
      </Box>
    </Box>
  );
};