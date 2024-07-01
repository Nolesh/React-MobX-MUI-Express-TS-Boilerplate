import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


interface IModuleData {
    name: string;
    url: string;
}

export default function NavTabs(props: { modules: IModuleData[] }) {

    const { modules } = props;

    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();   

    React.useEffect(() => {        
        let index = modules.findIndex((m) => m.url === location.pathname.substring(1));
        index = index === -1 ? 0 : index;

        handleChange(index);
    }, []);

    const handleChange = (newValue: number) => {
        setValue(newValue);
        navigate(modules[newValue].url);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={(e, v) => handleChange(v)}
                    aria-label="nav tabs"
                    role="navigation"
                    centered
                >
                    {
                        props.modules.map((x, i) => <Tab key={`tab-${i}`} label={x.name} />)
                    }
                </Tabs>
            </Box>
        </Box>
    );
}
