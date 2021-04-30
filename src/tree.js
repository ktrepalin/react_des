import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import {ModuleIcon, AttrIcon, MethIcon} from './icons';
import { setScriptToEditor } from './api/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 'calc(100vh - 50px)',
    maxWidth: 752,
    width: '95%',
    position: 'relative',
    float: 'left',
    flexGrow: 1,
    overflow: "auto",
    boxShadow: '0 0 3px rgba(0,0,0,0.35),  0 0 3px rgba(0,0,0,0.35)',
    backgroundColor: 'rgba(165, 167, 169, 0.2)',
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


export default function ControlledTreeView(props) {
  const data = props.data
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  // const handleToggle = (event, nodeIds) => {
  //   setExpanded(nodeIds);
  // };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const onDoubleClick = (name,type,parent) => {
    if (type === 'module') {
      setScriptToEditor(type,name)
    } else if (type === 'method') {
      setScriptToEditor(type,name,parent)
    }
  };

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
    <TreeView
      hidden = {props.menu !== 'tree'}
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      // expanded={expanded}
      selected={selected}
      // onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <div className={classes.margin}>
      {renderTree(data,null)}
      </div>
    </TreeView>
  );
}