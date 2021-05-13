import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import * as Icons from './icons';
import { search, SearchInput } from './search'
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { setScriptToEditor, openStorage } from '../api/actions'
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 752,
    width: '95%',
  },
  papper: {
    display: 'flex',
    alignItems: 'center',
    width: '95%',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    // height: '38px',
    backgroundColor: 'rgba(1, 1, 1, 0)',
  },
  list: {
    maxHeight: 'calc(100vh - 110px)',
    // maxWidth: 752,
    width: '95%',
    flexGrow: 1,
    overflow: "auto",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  secondary:{
    // textAlign: 'right',
    // marginTop: '-16px',
    fontSize: '11px'
  },
  primary:{
    marginLeft: '-20px',
    fontSize: '14px'
  }
}));


function cutName(name) {
  let substr
  if (name.length > 25) {
    substr = name.includes(' ') ? name.split(' ')[1] : name
    substr = substr.includes('.') ? substr.split('.')[1] : substr
    substr = substr.length > 25 ? substr.substring(0, 25) + '...' : substr
    return substr
  } else {
    return name
  }
}

function LabelIcon(props) {
  const type = props.type
  switch(type) {
    case 'classes':
      return (<Icons.ClassIcon/>)
    case 'storages':
      return (<Icons.StorageIcon />)
    case 'models':
      return (<Icons.ModelIcon />)
    case 'ustorages':
      return (<Icons.UStorageIcon />)
    case 'events':
      return (<Icons.EventIcon />)
    case 'hosts':
      return (<Icons.HostIcon />)
    case 'appservers':
      return (<Icons.AppServIcon />)
    case 'databases':
      return (<Icons.DataBaseIcon />)
    case 'plugins':
      return (<Icons.PluginIcon />)
    case 'jobs':
      return (<Icons.JobIcon />)
    default:
      return <Icons.ClassIcon />
  }
}

function EndButton(props) {
  const type = props.type
  const item = props.item

  if (type === 'models' || type === 'storages') {
    return (
      <ListItemSecondaryAction>
        {/*<Link to={{pathname: "/storage/" + item.name}}>*/}
          <IconButton edge="end" aria-label="play">
            <PlayIcon onClick={()=>{openStorage(item.name)}}/>
          </IconButton>

      </ListItemSecondaryAction>
    )
  } else {
    return ''
  }
}


export default function ListBox(props) {
  let data = props.data
  const type = props.type
  const classes = useStyles();
  const [searchString, setSearchString] = React.useState([]);
  // const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);
  const onDoubleClick = (name,type) => {
    setScriptToEditor(type,name)
  };


  if (searchString.length) {
    data = data.filter(e => search(e, searchString));
  }

  return (
    <div className={classes.root} hidden = {props.menu !== 'list'} >
      <SearchInput setSearchString={ setSearchString } searchString={ searchString } hidden = {props.menu !== 'tree'}/>
      <Paper component="form" className={classes.papper} elevation={4} >
        <List className={classes.list} dense={ true } disablePadding = {true}>
          {
            data.map((item)=>(
              <div key={item.id} onDoubleClick={()=>{onDoubleClick(item.name, item.type)}}>
              <ListItem button>
                <ListItemIcon>
                  <LabelIcon type={item.type} />
                </ListItemIcon>
                  <ListItemText classes={{secondary: classes.secondary, primary: classes.primary}}
                    primary= {cutName(item.name)}
                    secondary={item.desc ? item.desc : null}
                  />
                  <EndButton type={type} item={item}/>
              </ListItem>
              <Divider/>
              </div>
            ))
          }
        </List>
      </Paper>
    </div>
  );
}
