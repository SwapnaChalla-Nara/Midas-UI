// Mock API service to simulate OpenSearch API for Name Index search
// In a real implementation, this would connect to the actual OpenSearch API

import { SearchFormData, SearchResponse, SearchResult } from '../types/search';

// Mock data for demonstration
const generateMockResults = (formData: SearchFormData, count: number): SearchResult[] => {
  const results: SearchResult[] = [];
  
  for (let i = 1; i <= count; i++) {
    const result: SearchResult = {
      id: `${formData.indexType}_${i}`,
      indexType: formData.indexType,
      recordId: `${formData.indexType.toUpperCase()}-${String(i).padStart(6, '0')}`,
    };

    // Add mock data based on index type and selected fields
    if (formData.indexType === 'master') {
      if (formData.selectedFields.includes('name')) {
        const names = ['John Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'Michael Davis'];
        result.name = names[i % names.length] + ` ${i}`;
      }
      if (formData.selectedFields.includes('location')) {
        const locations = ['Washington, DC', 'New York, NY', 'Boston, MA', 'Philadelphia, PA', 'Richmond, VA'];
        result.location = locations[i % locations.length];
      }
      if (formData.selectedFields.includes('date')) {
        const dates = ['1865-04-15', '1863-07-01', '1861-12-07', '1865-05-26', '1862-09-17'];
        result.date = dates[i % dates.length];
      }
      if (formData.selectedFields.includes('subject')) {
        const subjects = ['Civil War', 'Military Service', 'Government Records', 'Historical Documents', 'Presidential Papers'];
        result.subject = subjects[i % subjects.length];
      }
      if (formData.selectedFields.includes('recordType')) {
        const recordTypes = ['Letter', 'Document', 'Report', 'Telegram', 'Photograph'];
        result.recordType = recordTypes[i % recordTypes.length];
      }
      // Add collection info
      result.collection = 'National Archives Collection';
    } else {
      // Flexoline index
      if (formData.selectedFields.includes('surname')) {
        const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        result.surname = surnames[i % surnames.length];
      }
      if (formData.selectedFields.includes('givenName')) {
        const givenNames = ['John William', 'Mary Elizabeth', 'Robert James', 'Patricia Ann', 'Michael Thomas'];
        result.givenName = givenNames[i % givenNames.length];
      }
      if (formData.selectedFields.includes('birthDate')) {
        const birthDates = ['1920-03-15', '1918-11-22', '1922-07-04', '1919-12-01', '1921-05-30'];
        result.birthDate = birthDates[i % birthDates.length];
      }
      if (formData.selectedFields.includes('birthPlace')) {
        const birthPlaces = ['Chicago, IL', 'Detroit, MI', 'Cleveland, OH', 'Milwaukee, WI', 'Indianapolis, IN'];
        result.birthPlace = birthPlaces[i % birthPlaces.length];
      }
      if (formData.selectedFields.includes('occupation')) {
        const occupations = ['Soldier', 'Clerk', 'Mechanic', 'Farmer', 'Teacher'];
        result.occupation = occupations[i % occupations.length];
      }
      if (formData.selectedFields.includes('unit')) {
        const units = ['1st Infantry Regiment', '5th Cavalry Division', '3rd Artillery Battalion', '2nd Engineers Company'];
        result.unit = units[i % units.length];
      }
      // Add collection info
      result.collection = 'Military Personnel Records';
    }

    results.push(result);
  }

  return results;
};

// Simulate search API call
export const searchNameIndex = async (formData: SearchFormData): Promise<SearchResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Simulate different result counts based on query
  let resultCount: number;
  const query = formData.searchQuery.toLowerCase();
  
  if (query.includes('smith') || query.includes('john')) {
    resultCount = Math.floor(Math.random() * 50) + 25; // 25-75 results
  } else if (query.includes('*')) {
    resultCount = Math.floor(Math.random() * 100) + 50; // 50-150 results (wildcards return more)
  } else if (query.includes('or')) {
    resultCount = Math.floor(Math.random() * 75) + 30; // 30-105 results (OR queries return more)
  } else if (query.length < 3) {
    resultCount = 0; // Very short queries return no results
  } else {
    resultCount = Math.floor(Math.random() * 30) + 5; // 5-35 results
  }

  // Limit to actual results generated
  const actualResultCount = Math.min(resultCount, 100); // Cap at 100 for demo
  const results = generateMockResults(formData, actualResultCount);

  return {
    results,
    totalCount: resultCount,
    page: 1,
    pageSize: actualResultCount,
    searchQuery: formData.searchQuery,
    indexType: formData.indexType,
    searchFields: formData.selectedFields,
  };
};

// Mock function to simulate API error states
export const searchWithErrors = async (formData: SearchFormData): Promise<SearchResponse> => {
  // Simulate random errors for testing error handling
  if (Math.random() < 0.1) { // 10% chance of error
    throw new Error('Connection to OpenSearch API failed. Please try again.');
  }
  
  if (formData.searchQuery.toLowerCase().includes('error')) {
    throw new Error('Invalid search query. Please check your search terms.');
  }

  return searchNameIndex(formData);
};