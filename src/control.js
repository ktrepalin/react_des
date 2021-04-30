import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import FolderOpenIcon from '@material-ui/icons/FolderOpenOutlined';
import { run, save, open } from './api/actions';

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