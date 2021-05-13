import React, { Component } from "react";
import { withStyles, AppBar, Tabs, Tab, Grid, Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import cloneDeep from "lodash/cloneDeep";
// import PropTypes from 'prop-types';
import { Input, Output } from './editor';
import ObjectViewTable from './dataGrid';

//-------------------- EDITOR
var tabPanel

const Vilka = (props) => {
  if (props.type===1) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
      <Input index={props.index}/>
      <Output index={props.index}/>
      </div>
    )
  } else {
    return (
      <ObjectViewTable name={props.name}/>
    )
  }

}

function GetEditors(props) {
  const { value, index, type, name, ...other } = props;
  // const aceEditorRef = useRef();
  return (
    <div
      role="tabpanel"
      style={{ width: '100%', height: '100%' }}
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Vilka type={type} index={index} name={name}/>
    </div>);
}


//-----------------------TABS
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#EBEDEF",
    height: '90%',
    width: '100%',
    boxShadow: '0 0 3px rgba(0,0,0,0.35),  0 0 3px rgba(0,0,0,0.35)',
    border: '1px'
  },
  appBar: {
    color: "inherit",
    // maxWidth: "100%",
    // width: "100%",
    // backgroundColor: "#EBEDEF",
    backgroundColor: 'rgba(165, 167, 169, 0.2)',
  },
  tabsIndicator: {
    backgroundColor: "#272822"
  },
  tabsRoot: {
    minHeight: '38px',
    height: '38px',
  },
  tabRoot: {
    fontSize: 12,
    minHeight: '38px',
    textTransform: 'none',
    height: '38px',
    marginRight: -10,
    color: "#999999",
    "&$tabSelected": {
      color: "#111111"
    },
  },
  tabSelected: {}
});



function cutName(name) {
  return name.substring(0, 16);
}

class CustomTabs extends Component {
  constructor(...args) {
    super(...args);
    tabPanel = this
    this.state = {
      value: 0,
      tabList: [{
        key: 0,
        id: 0,
        name: 'DSL ',
        type: 1, // DSL
      }]
    };
  }

  addTab = (name,type=1) => {
    let id
    this.setState((state, props) => {
      let tabList = cloneDeep(state.tabList);
      id = tabList[tabList.length - 1].id + 1;
      tabList.push({
        key: id,
        id: id,
        name: name,
        type: type,
      });
      return {
        tabList
      }
    }, () => {
      this.setState({
        value: id
      })
    })
  }

  deleteTab = (e) => {
    e.stopPropagation();

    if (this.state.tabList.length === 1) { return; }

    let tabID = parseInt(e.target.id);
    let tabIDIndex = 0;

    let tabList = this.state.tabList.filter((value, index) => {
      if (value.id === tabID) {
        tabIDIndex = index;
      }
      return value.id !== tabID;
    });

    this.setState((state, props) => {
      let curValue = parseInt(state.value);
      if (curValue === tabID) {
        if (tabIDIndex === 0) {
          curValue = state.tabList[tabIDIndex + 1].id
        } else {
          curValue = state.tabList[tabIDIndex - 1].id
        }
      }
      return {
        value: curValue
      }
    }, () => {
      this.setState({
        tabList: tabList
      })
    });
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // console.log(this.state);
    return (
      <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xl={11} lg={11} md={11}  sm={11}  xs={11} >
                        <Tabs
                            value={value}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                        >
                            {
                                this.state.tabList.map((tab)=>(
                                    <Tab
                                        key={tab.key.toString()}
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                        value={tab.id}
                                        label={cutName(tab.name)}
                                        icon={
                                            <Close
                                                id={tab.id}
                                                onClick={this.deleteTab}
                                            />
                                        }
                                        className="mytab"
                                    />
                                ))
                            }
                        </Tabs>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1} >
                        <Button
                            // variant="outlined"
                            onClick= {() => this.addTab('DSL',1)}
                            //{this.addTab}
                        >
                            <Add/>
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
          {
            this.state.tabList.map((tab)=>(
              <GetEditors value={value} index={tab.id} key={tab.key.toString()} type={tab.type} name={tab.name}/>

            ))
          }
          </div>
    );
  }
}

export default withStyles(styles)(CustomTabs);
export { tabPanel };