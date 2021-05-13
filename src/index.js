import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { makeStyles } from '@material-ui/core/styles';
import reportWebVitals from './reportWebVitals';
import Designer from './components/designer';

function App() {

  return (
    <Designer />
  )

}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
reportWebVitals();
