import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    button: {
        color: "white",
        backgroundColor: "green",
        margin: "10px"
    }
  }));

  const demoItems = [
      {_id: 1204834, name: "Tech"}, 
      { _id: 2435324123, name: "Marketing"}, 
      {_id: 12312434, name: "Art"}
  ]

  const demoLocations = [
      {_id: 123323, name: 'New York'},
      {_id: 124325, name: 'Georgia'},
      {_id: 213232, name: 'Arkansas'}
  ]
const CreateProject = () => {
    const classes = useStyles();

    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [openIndustry, setOpenIndustry] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);

    const handleChange = name => e => {
        if (name === "industry") setIndustry(e.target.value)
        if (name === "location") setLocation(e.target.value)
    }

    const handleOpen = (name) => {
            if (name === "industry") {
                setOpenIndustry(true);
                return;
            }
        if(name === "location" && openLocation === false) {
            setOpenLocation(true);
            return;
        }
    }

    const handleClose = (name) => {
            if (name === "industry") {
                setOpenIndustry(false);
            }
        if (name === "location" && openLocation === true) {
            setOpenLocation(false);
            return;
        }
    }

    const renderIndustryMenu = (items) => {
        return (
            <InputLabel id="industry-select-label">
                <h3>Industry</h3>
                <Select 
                    labelid="industry-select-label"
                    id="industry-select"
                    open={openIndustry}
                    onClose={() => handleClose("industry")}
                    onOpen={() => handleOpen("industry")}
                    value={industry}
                    onChange={handleChange("industry")}
                >
                <MenuItem value="">
                </MenuItem>    
                    {
                        items.map(item => {
                            return <MenuItem 
                                key={item._id} 
                                value={item.name}>
                                    {item.name}
                                </MenuItem>
                        })
                    }
                
                </Select>
            </InputLabel>
        )
    }

    const renderLocationMenu = (items) => {
        return (
            <InputLabel id="location-select-label">
                <h3>Project Location</h3>
                <Select 
                    labelid="location-select-label"
                    id="location-select"
                    open={openLocation}
                    onClose={() => handleClose("location")}
                    onOpen={() => handleOpen("location")}
                    value={location}
                    onChange={handleChange("location")}
                >
                <MenuItem value="">
                </MenuItem>    
                    {
                        items.map(item => {
                            return <MenuItem 
                                key={item._id} 
                                value={item.name}>
                                    {item.name}
                                </MenuItem>
                        })
                    }
                
                </Select>
            </InputLabel>
        )
    }

    return (
        <div className="create-project-container">
            <h1>Start with the basics</h1>
            <form>
                <h3>Project Title</h3>
                <input type="text" name="title"></input>
                <h3>Subtitle</h3>
                <input type="textarea" name="subtitle"></input>
                {renderIndustryMenu(demoItems)}
                {renderLocationMenu(demoLocations)}
                <h3>Download Images</h3>
                <h3>Funding Goal Amount</h3>
                <input type="text" name="fundingGoal"></input>
            </form>
             <Button className={classes.button} size="large">
                 Save
            </Button>
        </div>
    )
}

export default CreateProject;