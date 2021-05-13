import React from 'react';
import Tree from './tree';
import Tabs from './tabs';
import Control from './control';
import Selector from './tree_menu';
import ListBox from './list'
import { getElement } from '../api/requests'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: '100%',
    minHeight: '100%'
  },
  main: {
    minWidth: '100%',
    minHeight: '100vh',
    margin: 'auto',
  },
  work: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: '100%',
  },
  left:{
    // marginLeft: 'auto',
  }
}));

export default function Designer() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [menu, setMenu] = React.useState('');
  const [item, setItem] = React.useState('modules');

  function handleChange(newValue) {
    setItem(newValue);
    if (newValue === 'modules') {
      setMenu('tree')
    } else {
      setMenu('list')
    }
    getElement(newValue,setData)
  }

  return (
    <div className={classes.root}>
    <Grid className={classes.main} container spacing={1}>
      <Grid item xs={12} sm={3} container spacing={1}>
        <Grid className={classes.left} container direction="column" alignItems="center">
          <Selector onChange={handleChange}/>
          <Divider/>
          <Tree data={data} menu={menu}/>
          <ListBox data={data} menu={menu} type={item}/>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div className={classes.work}>
          <Control />
          <Divider/>
          <Tabs />
        </div>
      </Grid>
    </Grid>
    </div>
  )

}
