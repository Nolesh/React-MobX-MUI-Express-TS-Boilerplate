import React from 'react';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { MobXObserver, useStore } from "../stores";


const MySnackbar = MobXObserver(() => {
    const { isOpen, message, severity, closeMessage } = useStore('snackbar');

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={isOpen}
            // onClose={closeMessage}
            // message={message}
        >
            <Alert
                onClose={closeMessage}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
});

export default MySnackbar;