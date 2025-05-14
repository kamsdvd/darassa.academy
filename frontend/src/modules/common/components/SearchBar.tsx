import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  loading?: boolean;
  debounceTime?: number;
  minLength?: number;
}

export const SearchBar = React.memo<SearchBarProps>(({
  placeholder = 'Rechercher...',
  onSearch,
  onResultSelect,
  results = [],
  loading = false,
  debounceTime = 300,
  minLength = 2
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= minLength) {
        onSearch(query);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [query, debounceTime, minLength, onSearch]);

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setShowResults(true);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setShowResults(false);
  }, []);

  const handleResultClick = useCallback((result: SearchResult) => {
    onResultSelect?.(result);
    setShowResults(false);
  }, [onResultSelect]);

  const handleClickOutside = useCallback(() => {
    setShowResults(false);
  }, []);

  const inputProps = useMemo(() => ({
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    endAdornment: query && (
      <InputAdornment position="end">
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <IconButton
            size="small"
            onClick={handleClear}
            edge="end"
          >
            <ClearIcon />
          </IconButton>
        )}
      </InputAdornment>
    )
  }), [query, loading, handleClear]);

  const resultsList = useMemo(() => {
    if (!showResults || query.length < minLength) return null;

    return (
      <Paper
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          mt: 1,
          maxHeight: 300,
          overflow: 'auto'
        }}
        elevation={3}
      >
        {loading ? (
          <Box p={2} display="flex" justifyContent="center">
            <CircularProgress size={20} />
          </Box>
        ) : results.length > 0 ? (
          <List>
            {results.map((result) => (
              <ListItem
                key={result.id}
                button
                onClick={() => handleResultClick(result)}
              >
                <ListItemText
                  primary={result.title}
                  secondary={
                    <React.Fragment>
                      {result.description && (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {result.description}
                        </Typography>
                      )}
                      {result.type && (
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          {result.type}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box p={2}>
            <Typography color="text.secondary">
              Aucun résultat trouvé
            </Typography>
          </Box>
        )}
      </Paper>
    );
  }, [showResults, query, minLength, loading, results, handleResultClick]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        value={query}
        onChange={handleQueryChange}
        placeholder={placeholder}
        InputProps={inputProps}
      />
      {resultsList}
    </Box>
  );
});

SearchBar.displayName = 'SearchBar'; 