import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

export default function NavTabs({filters, setFilter}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilter(filters[newValue])
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example" >
            {
                filters.map((filter, ix) => {
                    return (
                        <Tab 
                            key={ix}
                            onClick={event => {
                                event.preventDefault();
                            }} 
                            label={filter} {...a11yProps(0)} />
                    )
                })
            }
            </Tabs>
        </div>
    );
}