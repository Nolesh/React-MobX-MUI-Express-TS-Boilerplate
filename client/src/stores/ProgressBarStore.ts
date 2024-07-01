const ProgressBarStore: {
    loading: boolean;    
    setLoadingState(enabled: boolean): void;    
} = {
    loading: false,    
    setLoadingState(enabled) {
        this.loading = enabled;
    },    
};

export default ProgressBarStore;