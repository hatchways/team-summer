import React from 'react'
import {makeStyles, withTheme} from '@material-ui/core/styles'

const useStyles = makeStyles({
    boldLine: ({theme}) => ({
        width: 60,
        height: 3,
        backgroundColor: theme.primary,
        marginBottom: 30
    })
});

const BoldLine = (props) => {
    const classes = useStyles(props)

    return <div className={classes.boldLine}/>

};

export default withTheme(BoldLine)
