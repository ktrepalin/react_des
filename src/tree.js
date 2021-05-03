import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import {ModuleIcon, AttrIcon, MethIcon} from './icons';
import { setScriptToEditor } from './api/actions'
import SearchInput from './search'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 752,
    width: '95%',
  },
  tree: {
    maxHeight: 'calc(100vh - 110px)',
    // maxWidth: 752,
    width: '95%',
    flexGrow: 1,
    overflow: "auto",
  },
  label: {
    fontSize: 12
  },
  selector:{
    // maxWidth: '18vw',
  },
  margin: {
    margin: theme.spacing(1, 2, 0, 2),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
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
}));


function LabelIcon(props) {
  const {className, fontSize, type} = props
  switch(type) {
    case 'module':
      return (<ModuleIcon className={className} fontSize={fontSize} />)
    case 'attr':
      return (<AttrIcon className={className} fontSize={fontSize} />)
    case 'method':
      return (<MethIcon className={className} fontSize={fontSize} />)

  }
  return (
    <ModuleIcon className={className} fontSize={fontSize} />
  );
}

function cutName(name) {
  if (name.length > 35) {
    return (name.substring(0, 35) + '...')
  } else {
    return name
  }
}

function isMatch(event, searchString) {
  return event.name.toLowerCase().match(searchString);
};

function search(event, searchString) {
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

export default function ControlledTreeView(props) {
  let data = props.data
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState([]);
  // const [selected, setSelected] = React.useState([]);
  const [searchString, setSearchString] = React.useState([]);

  // const handleToggle = (event, nodeIds) => {
  //   setExpanded(nodeIds);
  // };

  // const handleSelect = (event, nodeIds) => {
  //   setSelected(nodeIds);
  // };

  const onDoubleClick = (name,type,parent) => {
    if (type === 'module') {
      setScriptToEditor(type,name)
    } else if (type === 'method') {
      setScriptToEditor(type,name,parent)
    }
  };

  if (searchString.length) {
    data = data.filter(e => search(e, searchString));
    // let nodeIds = [];
    // for (let node of nodeIds) {
    //   nodeIds.push(node.nodeId)
    // }
    //  setExpanded(nodeIds);
  } else {
    // setExpanded([]);
  }

  const renderTree = (nodes, parent) => {
    var modul = (parent != null) ? parent.name : null
    return (
    nodes.map((node)=>(
      <TreeItem classes={{ label: classes.label }}
        key={node.id}
        nodeId={node.id}
        label={
          <div className={classes.labelRoot} onDoubleClick={()=>{onDoubleClick(node.name, node.type, modul)}}>
            <LabelIcon className={classes.labelIcon} fontSize="small" type={node.type} />
            {cutName(node.name)}
          </div>
        }
      >
        {Array.isArray(node.children) ? renderTree(node.children, node) : null}
      </TreeItem>
    )))
  };

  return (
    <div className={classes.root} hidden = {props.menu !== 'tree'}>
      <SearchInput setSearchString={ setSearchString } searchString={ searchString } hidden = {props.menu !== 'tree'}/>
      <Paper component="form" className={classes.papper} elevation={4} >
        <TreeView
          hidden = {props.menu !== 'tree'}
          className={classes.tree}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          // expanded={expanded}
          // selected={selected}
          // onNodeToggle={handleToggle}
          // onNodeSelect={handleSelect}
        >
          <div className={classes.margin}>
          {renderTree(data,null)}
          </div>
        </TreeView>
      </Paper>
    </div>
  );
}