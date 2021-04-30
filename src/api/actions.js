import ace from "ace-builds";
import { tabPanel } from '../tabs';
import { runScript, getScript } from './requests'

export function run() {
  var currentTab = tabPanel.state.value
  const editor = ace.edit('input'+currentTab)
  const output = ace.edit('output'+currentTab)
  const data = { 'cmd': editor.getValue() };
  runScript(data,output)
}

export function save() {
  var tmp = 1
}

export function open(e) {
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


export async function setScriptToEditor(type, name, parent) {
  await tabPanel.addTab(name.substring(0, 16))
  var currentTab = tabPanel.state.value
  const editor = ace.edit('input'+currentTab)
  getScript(type, name, parent, editor)
}