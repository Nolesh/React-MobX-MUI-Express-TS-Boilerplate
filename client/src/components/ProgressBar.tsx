import React from 'react';
import { LinearProgress } from '@mui/material';
import { MobXObserver, useStore } from "../stores";

const ProgressBar = MobXObserver(() => {
    const { loading } = useStore('progressBar');
    
    if (!loading) return null;
    return <LinearProgress className="progressBar" />
});

export default ProgressBar;