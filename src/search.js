import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '1px 2px',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    width: '95%',
    height: '36px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '14px'
  },
  iconButton: {
    padding: 10,
  },
}));

export function isMatch(event, searchString) {
  return event.name.toLowerCase().match(searchString);
};

export function search(event, searchString) {
  // return (isMatch(event, searchString))
  var parent = (isMatch(event, searchString))
  var childs = (Array.isArray(event.children) &&
      event.children.filter(e => search(e, searchString))
    )
  if (childs.length) {
    event.children = childs
  }
  return (parent || childs.length)
};


export function SearchInput(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const setSearchString = props.setSearchString

  const handleChange = (event) => {
    setValue(event.target.value.trim().toLowerCase())
  };

  const onClick = (event) => {
    setSearchString(value)
  };


  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        onChange={handleChange}
        className={classes.input}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onKeyPress={event => {
          if (event.key === "Enter") {
            onClick(event);
            event.preventDefault()
          }
        }}
      />
      <IconButton className={classes.iconButton} onClick={onClick} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}