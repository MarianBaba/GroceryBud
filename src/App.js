import React, { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';
import { Button, Grow, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    margin: 50,
  },
  title: {
    fontSize: 50,
    margin: 30,
    fontFamily: "Rubik"
  },
  btn: {
    margin: 10,
    fontSize: 15,
    backgroundColor: "rgb(70,255,70)",
    '&:hover': {
      backgroundColor: "rgb(120,255,120)",
      boxShadow: "0px 0px 3px grey"
    },
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    margin: 10,
    '&:hover': {
      backgroundColor: "red",
      boxShadow: "0px 0px 5px grey"
    },
  }
}));

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' })

  const classes = useStyles();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed')
    }
    else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <Grow in>
      <Paper className={classes.paper}>
        <section>
          <form onSubmit={handleSubmit}>

            <Typography className={classes.title}>Grocery Bud</Typography>
            {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
            <div>
              <TextField className={classes.form} variant="outlined" type="text" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button className={classes.btn} type="submit">
              {isEditing ? 'edit' : 'submit'}
            </Button>

          </form>
          {list.length > 0 && (<div>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <Button className={classes.deleteBtn} onClick={clearList}>Clear Items</Button>
          </div>)}
        </section>
      </Paper>
    </Grow>
  );
}

export default App;
