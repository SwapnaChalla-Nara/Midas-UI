import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  TextField,
  Button,
  Chip,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon, Help as HelpIcon } from '@mui/icons-material';
import { 
  IndexType, 
  SearchFormData, 
  getFieldsForIndex,
} from '../types/search';

interface NameIndexSearchFormProps {
  onSearch: (formData: SearchFormData) => void;
  loading?: boolean;
}

export const NameIndexSearchForm: React.FC<NameIndexSearchFormProps> = ({ 
  onSearch, 
  loading = false 
}) => {
  const [formData, setFormData] = useState<SearchFormData>({
    indexType: 'master',
    selectedFields: ['name'], // Default to name field selected
    searchQuery: '',
    searchTerms: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentFields = getFieldsForIndex(formData.indexType);

  const handleIndexTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndexType = event.target.value as IndexType;
    const defaultFields = newIndexType === 'master' ? ['name'] : ['surname'];
    setFormData({
      ...formData,
      indexType: newIndexType,
      selectedFields: defaultFields,
    });
  };

  const handleFieldToggle = (fieldId: string) => {
    const newSelectedFields = formData.selectedFields.includes(fieldId)
      ? formData.selectedFields.filter(id => id !== fieldId)
      : [...formData.selectedFields, fieldId];
    
    setFormData({
      ...formData,
      selectedFields: newSelectedFields,
    });
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      searchQuery: event.target.value,
    });
    // Clear error when user starts typing
    if (errors.searchQuery) {
      setErrors({ ...errors, searchQuery: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.searchQuery.trim()) {
      newErrors.searchQuery = 'Search query is required';
    }

    if (formData.selectedFields.length === 0) {
      newErrors.selectedFields = 'At least one field must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validateForm()) {
      onSearch(formData);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Name Index Search
        </Typography>

        {/* Index Selection */}
        <FormControl component="fieldset" sx={{ mb: 4 }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Select Index
          </FormLabel>
          <RadioGroup
            value={formData.indexType}
            onChange={handleIndexTypeChange}
            row
          >
            <FormControlLabel 
              value="master" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Master Index
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    General historical records and documents
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel 
              value="flexoline" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Flexoline
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Military personnel and service records
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Field Selection */}
        <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Search Fields
            <Tooltip 
              title="Select which fields to search within. You can select multiple fields to broaden your search."
              arrow
            >
              <HelpIcon sx={{ ml: 1, fontSize: 16, color: 'text.secondary' }} />
            </Tooltip>
          </FormLabel>
          
          {errors.selectedFields && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.selectedFields}
            </Alert>
          )}

          <FormGroup row sx={{ gap: 2 }}>
            {currentFields.map((field) => (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    checked={formData.selectedFields.includes(field.id)}
                    onChange={() => handleFieldToggle(field.id)}
                  />
                }
                label={
                  <Tooltip title={field.description} arrow placement="top">
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {field.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                }
              />
            ))}
          </FormGroup>

          {/* Display selected fields as chips */}
          {formData.selectedFields.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                Selected fields:
              </Typography>
              {formData.selectedFields.map((fieldId) => {
                const field = currentFields.find(f => f.id === fieldId);
                return (
                  <Chip
                    key={fieldId}
                    label={field?.label}
                    size="small"
                    onDelete={() => handleFieldToggle(fieldId)}
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                );
              })}
            </Box>
          )}
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Search Query */}
        <Box sx={{ mb: 4 }}>
          <FormLabel sx={{ mb: 2, fontWeight: 600, display: 'block' }}>
            Search Query
            <Tooltip 
              title={`Use wildcards (*) for partial matches. Use "OR" to search for multiple terms. Example: "Smith OR Jones" or "John*"`}
              arrow
            >
              <HelpIcon sx={{ ml: 1, fontSize: 16, color: 'text.secondary' }} />
            </Tooltip>
          </FormLabel>
          
          <TextField
            fullWidth
            variant="outlined"
            value={formData.searchQuery}
            onChange={handleSearchQueryChange}
            placeholder={
              formData.indexType === 'master' 
                ? 'Enter names, locations, or topics (e.g., "Washington OR Lincoln", "Battle of*")'
                : 'Enter names or details (e.g., "Smith OR Jones", "John*")'
            }
            error={!!errors.searchQuery}
            helperText={errors.searchQuery || 'Supports wildcards (*) and OR operator for multiple terms'}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />

          {/* Search Tips */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Search Tips:</strong>
              <br />• Use wildcards (*) for partial matches: "Wash*" finds "Washington", "Washburn", etc.
              <br />• Use "OR" to search multiple terms: "Smith OR Jones" finds records with either name
              <br />• Combine both: "John* OR Mary*" finds records starting with either name
            </Typography>
          </Alert>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setFormData({
                indexType: 'master',
                selectedFields: ['name'],
                searchQuery: '',
                searchTerms: [],
              });
              setErrors({});
            }}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};