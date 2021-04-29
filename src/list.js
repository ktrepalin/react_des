import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    width: '100%',
    maxHeight: '88vh',
    overflow: "auto",
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
    marginLeft: '-20px'
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

export default function ListBox(props) {
  const data = props.data
  const classes = useStyles();
  // const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root} hidden = {props.menu !== 'list'} >
      <List dense={ true } disablePadding = {true}>
        {
          data.map((item)=>(
            <div key={item.id}>
            <ListItem button>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
               <ListItemText classes={{secondary: classes.secondary, primary: classes.primary}}
                  primary= {item.name}
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
