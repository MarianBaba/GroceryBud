import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    danger: {
        backgroundColor: "salmon",
        margin: 20,
        marginRight: '25%',
        marginLeft: '25%',
        padding: 10,
        borderRadius: 10,
    },
    success: {
        backgroundColor: "lightgreen",
        margin: 20,
        marginRight: '25%',
        marginLeft: '25%',
        padding: 10,
        borderRadius: 10,
    },
    typo: {
        fontSize: 20
    }
}));

const Alert = ({ type, msg, removeAlert, list }) => {
    const classes = useStyles();
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000)
        return () => clearTimeout(timeout)
    }, [list])
    return (
        <div className={(type === 'danger') ? classes.danger : classes.success}>
            <Typography className={classes.typo}>{msg}</Typography>
        </div>
    )
}

export default Alert;
