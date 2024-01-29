import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = ({ submit }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: submit ? '' : '60vh',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingComponent;
