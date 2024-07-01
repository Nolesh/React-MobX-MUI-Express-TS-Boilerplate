import React from "react";

import { useStore, MobXObserver } from "../stores";
import { Button, ButtonProps, styled } from "@mui/material";
import { red } from "@mui/material/colors";

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  border: "4px solid #ffaa22",
  margin: 10,
  padding: "6px 12px",
  "&:hover": {
    backgroundColor: red[700],
    border: "4px solid #dd5500",
  },
}));

const SimpleButton = styled(Button)<ButtonProps>({
  margin: 10,
});

// Wrap your component with the 'MobXObserver' to use the 'useStore' hook
const MobXExample = MobXObserver(() => {
  const progressBarStore = useStore("progressBar");
  const snackbarStore = useStore("snackbar");
  const themeStore = useStore("theme");

  return (
    <div className="mobx-page-wrapper">
      <div className="mobx-page">
        <SimpleButton
          variant="outlined"
          onClick={(e) =>
            progressBarStore.setLoadingState(!progressBarStore.loading)
          }
        >
          {progressBarStore.loading ? "Hide progress bar" : "Show progress bar"}
        </SimpleButton>
        <SimpleButton
          variant="outlined"
          onClick={(e) =>
            snackbarStore.isOpen
              ? snackbarStore.closeMessage()
              : snackbarStore.showMessage("Custom message", "info")
          }
        >
          {snackbarStore.isOpen ? "Hide snackbar" : "Show snackbar"}
        </SimpleButton>
        <SimpleButton
          variant="outlined"
          onClick={(e) => themeStore.setDark(!themeStore.dark)}
        >
          {themeStore.dark ? "Switch to light theme" : "Switch to dark theme"}
        </SimpleButton>
      </div>
    </div>
  );
});

export default MobXExample;
