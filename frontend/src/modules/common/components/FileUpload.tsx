import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  onDelete?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // en bytes
  maxFiles?: number;
  label?: string;
  helperText?: string;
}

interface FileWithStatus extends File {
  status?: 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  onDelete,
  accept,
  multiple = false,
  maxSize,
  maxFiles = 1,
  label = 'Glissez-déposez un fichier ici ou cliquez pour sélectionner',
  helperText
}) => {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `Le fichier est trop volumineux. Taille maximale: ${formatFileSize(maxSize)}`;
    }
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()}`;
      
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        return fileType.match(new RegExp(type.replace('*', '.*')));
      });

      if (!isValidType) {
        return `Type de fichier non accepté. Types acceptés: ${accept}`;
      }
    }
    return null;
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!multiple && droppedFiles.length > 1) {
      droppedFiles.splice(1);
    }

    const validFiles = droppedFiles.filter(file => {
      const error = validateFile(file);
      if (error) {
        setFiles(prev => [...prev, { ...file, status: 'error', error } as FileWithStatus]);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles(prev => {
        const newFiles = [...prev, ...validFiles.map(file => ({ ...file, status: 'uploading', progress: 0 } as FileWithStatus))];
        return multiple ? newFiles : newFiles.slice(-maxFiles);
      });

      for (const file of validFiles) {
        try {
          await onUpload(file);
          setFiles(prev => prev.map(f => 
            f === file ? { ...f, status: 'success', progress: 100 } : f
          ));
        } catch (error) {
          setFiles(prev => prev.map(f => 
            f === file ? { ...f, status: 'error', error: 'Erreur lors du téléchargement' } : f
          ));
        }
      }
    }
  }, [multiple, maxFiles, onUpload]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!multiple && selectedFiles.length > 1) {
      selectedFiles.splice(1);
    }

    const validFiles = selectedFiles.filter(file => {
      const error = validateFile(file);
      if (error) {
        setFiles(prev => [...prev, { ...file, status: 'error', error } as FileWithStatus]);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles(prev => {
        const newFiles = [...prev, ...validFiles.map(file => ({ ...file, status: 'uploading', progress: 0 } as FileWithStatus))];
        return multiple ? newFiles : newFiles.slice(-maxFiles);
      });

      for (const file of validFiles) {
        try {
          await onUpload(file);
          setFiles(prev => prev.map(f => 
            f === file ? { ...f, status: 'success', progress: 100 } : f
          ));
        } catch (error) {
          setFiles(prev => prev.map(f => 
            f === file ? { ...f, status: 'error', error: 'Erreur lors du téléchargement' } : f
          ));
        }
      }
    }
  }, [multiple, maxFiles, onUpload]);

  const handleDelete = useCallback((file: FileWithStatus) => {
    setFiles(prev => prev.filter(f => f !== file));
    onDelete?.(file);
  }, [onDelete]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Paper
          sx={{
            p: 3,
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 1,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragging ? 'action.hover' : 'background.paper',
            transition: 'all 0.2s ease-in-out'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {label}
          </Typography>
          {helperText && (
            <Typography variant="body2" color="text.secondary">
              {helperText}
            </Typography>
          )}
        </Paper>
      </label>

      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {file.status === 'success' ? (
                  <CheckCircleIcon color="success" />
                ) : file.status === 'error' ? (
                  <ErrorIcon color="error" />
                ) : (
                  <FileIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" component="span">
                      {formatFileSize(file.size)}
                    </Typography>
                    {file.error && (
                      <Typography variant="body2" color="error" component="span">
                        {' - '}{file.error}
                      </Typography>
                    )}
                    {file.status === 'uploading' && (
                      <LinearProgress
                        variant="determinate"
                        value={file.progress}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(file)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FileUpload; 