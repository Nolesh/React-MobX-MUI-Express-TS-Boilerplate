import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import {grey, blueGrey} from "@mui/material/colors";
import { MobXObserver, useStore } from '../stores';

export const LIGHT_BG = '#fff';
export const DARK_BG = '#121212';

const themeLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: blueGrey[700],            
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

export default MobXObserver(function(props: React.PropsWithChildren) {

    const {dark} = useStore('theme');

    React.useEffect(() => {
        document.body.style.backgroundColor = dark ? DARK_BG : LIGHT_BG;        
    }, [dark]);

    return(
        <ThemeProvider theme={ dark ? themeDark :themeLight}>            
            {
                props.children
            }            
        </ThemeProvider>
    )
});