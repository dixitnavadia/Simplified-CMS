import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DownloadIcon from '@mui/icons-material/Download';

const MetaDataViewer = ({ metaData, onExport }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        background: '#232323',
        color: '#fff',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px',
        minWidth: '220px',
        width: '90%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Page Metadata
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={onExport}
          sx={{
            color: '#90caf9',
            borderColor: '#555',
            '&:hover': { borderColor: '#90caf9' }
          }}
        >
          Export
        </Button>
      </Box>
      
      <Button
        fullWidth
        variant="text"
        onClick={handleToggle}
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          color: '#fff',
          justifyContent: 'space-between',
          mb: 1
        }}
      >
        {`${metaData.length} Elements`}
      </Button>
      
      <Collapse in={expanded}>
        <Box
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            background: '#181818',
            borderRadius: '8px',
            padding: '12px',
            fontFamily: 'monospace'
          }}
        >
          <pre style={{ margin: 0, fontSize: '12px' }}>
            {JSON.stringify(metaData, null, 2)}
          </pre>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default MetaDataViewer;