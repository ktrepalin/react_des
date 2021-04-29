import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MenuItem, MenuList, Popper, Paper, Grow, ClickAwayListener,ButtonGroup, Button, Grid } from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';

const options = [{key:'modules',value:'Модули'}, {key:'classes',value:'Классы'}, {key:'models',value:'Модели'}, {key:'storages',value:'Объекты'} ];

const useStyles = makeStyles({
  group: {
    // height: '100%',
    // float: 'left',
    // maxWidth: '28vw',
    // minWidth: '28vw',
  },
  label: {
    fontSize: 12,
    // width: '100px',
    // minWidth: '50px'
  },
  selector:{
    // display: 'flex',
    // flexDirection: 'column',
    minHeight: '42px',
    height: '42px',
    '& > *': {
      margin: '4px',
    }
  }
});


export default function Selector(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleClick = () => {
    // console.log(`click ${options[selectedIndex]}`);
    props.onChange(options[selectedIndex].key);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    props.onChange(options[index].key);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center" className={classes.selector}>
      <Grid item xs={12}>
        <ButtonGroup className={classes.group} variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button classes={{ label: classes.label }} onClick={handleClick}>{options[selectedIndex].value}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:1450}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option.key}
                        // disabled={index === selectedIndex}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}