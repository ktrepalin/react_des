import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, InputBase } from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    // height: '100%',
    // position: 'relative',
    // float: 'left',
    flexGrow: 1,
    // maxWidth: '18vw',
    // minWidth: '18vw',
    overflow: "auto",
  },
  label: {
    fontSize: 14,
  },
  selector:{
    // maxWidth: '18vw',
  }
});

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '5px 6px 5px 6px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


export default function Selector(props) {
  const classes = useStyles();
  const selector = props.item
  const [item, setItem] = React.useState('');
  const handleChange = (event) => {
    setItem(event.target.value);
    console.log(selector)
  };
  return (
    <div className={classes.selector}>
      <FormControl>
        <Select
          labelId="select-label"
          id="selector"
          value={item}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={'modules'}>Модули</MenuItem>
          <MenuItem value={'classes'}>Классы</MenuItem>
          <MenuItem value={'models'}>Модели</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
