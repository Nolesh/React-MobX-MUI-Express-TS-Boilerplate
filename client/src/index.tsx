import React from "react";
import { createRoot } from 'react-dom/client';

import { createTheme, ThemeProvider } from "@mui/material";
import bluegrey from "@mui/material/colors/blueGrey";
import grey from "@mui/material/colors/grey";

import App from "./modules/App";


// -------------------------------------------------
const useTheme = false;
// -------------------------------------------------

const themeLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: bluegrey[700],            
            contrastText: "#fff",            
        },
        secondary: {
            main: grey[700],            
        },        
    },    
});

const themeDark = createTheme({
    palette: {
        mode: 'dark',        
    }
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <>
        {useTheme && (
            <ThemeProvider theme={themeLight}>
                <App />
            </ThemeProvider>
        )}
        {!useTheme && <App />}
    </>
);
