// Types for Name Index Search functionality

export type IndexType = 'master' | 'flexoline';

export interface SearchField {
  id: string;
  name: string;
  label: string;
  description?: string;
}

export interface SearchFormData {
  indexType: IndexType;
  selectedFields: string[];
  searchQuery: string;
  searchTerms: SearchTerm[];
}

export interface SearchTerm {
  field: string;
  value: string;
  operator?: 'AND' | 'OR';
  wildcard?: boolean;
}

export interface SearchResult {
  id: string;
  indexType: IndexType;
  recordId: string;
  [key: string]: string | number | boolean | IndexType; // Dynamic fields based on selected search fields
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  page: number;
  pageSize: number;
  searchQuery: string;
  indexType: IndexType;
  searchFields: string[];
}

// Available fields for each index type
export const MASTER_INDEX_FIELDS: SearchField[] = [
  { id: 'name', name: 'name', label: 'Name', description: 'Person or entity name' },
  { id: 'location', name: 'location', label: 'Location', description: 'Geographic location' },
  { id: 'date', name: 'date', label: 'Date', description: 'Date or date range' },
  { id: 'subject', name: 'subject', label: 'Subject', description: 'Topic or subject matter' },
  { id: 'recordType', name: 'recordType', label: 'Record Type', description: 'Type of record' },
];

export const FLEXOLINE_FIELDS: SearchField[] = [
  { id: 'surname', name: 'surname', label: 'Surname', description: 'Last name' },
  { id: 'givenName', name: 'givenName', label: 'Given Name', description: 'First/middle name' },
  { id: 'birthDate', name: 'birthDate', label: 'Birth Date', description: 'Date of birth' },
  { id: 'birthPlace', name: 'birthPlace', label: 'Birth Place', description: 'Place of birth' },
  { id: 'occupation', name: 'occupation', label: 'Occupation', description: 'Profession or job' },
  { id: 'unit', name: 'unit', label: 'Military Unit', description: 'Military unit or organization' },
];

export const getFieldsForIndex = (indexType: IndexType): SearchField[] => {
  return indexType === 'master' ? MASTER_INDEX_FIELDS : FLEXOLINE_FIELDS;
};