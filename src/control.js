import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import FolderOpenIcon from '@material-ui/icons/FolderOpenOutlined';
import { tabPanel } from './tabs';
import ace from "ace-builds";
import axios from 'axios';
import qs from 'qs';

const useStyles = makeStyles((theme) => ({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#EBEDEF",
    minHeight: '38px',
    height: '38px',
    '& > *': {
      margin: '4px',
    }
  },
}));

function run() {
  var currentTab = tabPanel.state.value
  console.log('текущая = ' + currentTab);
  const editor = ace.edit('input'+currentTab)
  const output = ace.edit('output'+currentTab)
  const data = { 'cmd': editor.getValue() };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: '/service/cmd'
  };
  axios(options)
    .then(res => {
        output.setValue(res.data)
        output.clearSelection()
    })
    .catch(function (error) {
      console.log(error);
    });
}

function save() {

}

function open(e) {
  var file = e.target.files[0]
  if (!file) return;
  const fileReader = new FileReader()
  fileReader.onload = function() {
    var currentTab = tabPanel.state.value
    var editor = ace.edit('input'+currentTab)
    editor.setValue(fileReader.result)
    editor.clearSelection()
  }
  tabPanel.addTab(file.name.substring(0, 16))
  fileReader.readAsText(file)
}

export default function ControlPanel() {
  const classes = useStyles();

  return (
    <div className={classes.panel}>
      <ButtonGroup
        variant="text"
        aria-label="text primary button group"
      >
        <Button
          style={{maxHeight: '30px', minHeight: '30px', textTransform: 'none'}}
          onClick={run}
          startIcon={<PlayIcon />}
        >
          Старт
        </Button>
        <Button
          style={{maxHeight: '30px', minHeight: '30px', textTransform: 'none'}}
          startIcon={<SaveIcon />}
        >
        Сохранить
        </Button>
        <Button
          style={{maxHeight: '30px', minHeight: '30px', textTransform: 'none'}}
          startIcon={<FolderOpenIcon />}
          component="label"
        >
        <input
          id="icon-button-file"
          type="file"
          onChange={e => open(e)}
          hidden
        />
        Открыть
        </Button>
      </ButtonGroup>
    </div>
  );
}