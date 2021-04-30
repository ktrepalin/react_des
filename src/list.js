import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ClassIcon, StorageIcon, ModelIcon} from './icons';
import Divider from '@material-ui/core/Divider';
import { setScriptToEditor } from './api/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    width: '95%',
    maxHeight: '93vh',
    overflow: "auto",
    boxShadow: '0 0 3px rgba(0,0,0,0.35),  0 0 3px rgba(0,0,0,0.35)',
    backgroundColor: 'rgba(165, 167, 169, 0.2)'
  },
  // demo: {
  //   backgroundColor: theme.palette.background.paper,
  // },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  secondary:{
    textAlign: 'right',
    marginTop: '-16px',
    fontSize: '11px'
  },
  primary:{
    marginLeft: '-20px',
    fontSize: '14px'
  }
}));

// function generate(element) {
//   return (
//     <ListItem button>
//       <ListItemIcon>
//         <FolderIcon />
//       </ListItemIcon>
//     </ListItem>
//   )
// }

function cutName(name) {
  if (name.length > 35) {
    return (name.substring(0, 35) + '...')
  } else {
    return name
  }
}

function LabelIcon(props) {
  const type = props
  switch(type) {
    case 'classes':
      return (<ClassIcon/>)
    case 'storages':
      return (<StorageIcon />)
    case 'models':
      return (<ModelIcon />)
  }
  return (
    <ModelIcon />
  );
}


export default function ListBox(props) {
  const data = props.data
  const classes = useStyles();
  // const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);
  const onDoubleClick = (name,type) => {
    setScriptToEditor(type,name)
  };

  return (
    <div className={classes.root} hidden = {props.menu !== 'list'} >
      <List dense={ true } disablePadding = {true}>
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
            </ListItem>
            <Divider/>
            </div>
          ))
        }
      </List>
    </div>
  );
}
