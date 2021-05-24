import { Button, Card, Typography } from '@material-ui/core';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: "0px 0px 7px gray",
        margin: 50,

    },
    title: {
        fontSize: 23,
        padding: 10,
    },
    btn: {
        fontSize: 15,
        margin: 10,
        padding: 5,
        backgroundColor: "lightblue",
        '&:hover': {
            backgroundColor: "blue",
        },
    },
    deleteBtn: {
        fontSize: 15,
        margin: 10,
        padding: 5,
        backgroundColor: "salmon",
        '&:hover': {
            backgroundColor: "red",
        },
    }
}));

const List = ({ items, removeItem, editItem }) => {

    const classes = useStyles();

    return (
        <div>
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <Card className={classes.card}>
                        <article key={id}>
                            <Typography className={classes.title}>{title}</Typography>
                            <div>
                                <Button
                                    className={classes.btn}
                                    onClick={() => editItem(id)}
                                    type="button"><FaEdit /></Button>
                                <Button
                                    className={classes.deleteBtn}
                                    onClick={() => removeItem(id)}
                                    type="button"><FaTrash /></Button>
                            </div>
                        </article>
                    </Card>
                )
            })}
        </div>
    )
}

export default List
