type TSnackbarSeverity = "error" | "warning" | "info" | "success";

const SnackbarStore: {
    message: string;
    severity: TSnackbarSeverity;
    isOpen: boolean;
    showMessage(message: string, severity: TSnackbarSeverity): void;
    closeMessage(): void;
} = {
    message: "",
    severity: "info",
    isOpen: false,
    showMessage(message, severity) {
        this.message = message;
        this.severity = severity;
        this.isOpen = true;
    },
    closeMessage() {
        this.isOpen = false;
    },
};

export default SnackbarStore;
