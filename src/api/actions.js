import ace from "ace-builds";
import { tabPanel } from '../components/tabs';
import { runScript, getScript } from './requests'

export function run() {
  var currentTab = tabPanel.state.value
  const editor = ace.edit('input'+currentTab)
  const output = ace.edit('output'+currentTab)
  const data = { 'cmd': editor.getValue() };
  runScript(data,output)
}

export function save() {
  var currentTab = tabPanel.state.value
  var name = tabPanel.state.tabList[currentTab].name
  const editor = ace.edit('input'+currentTab)
  var element = document.createElement("a");
  var file = new Blob([ editor.getValue() ], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = name + ".rb";
  element.click();
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
  tabPanel.addTab(file.name)
  fileReader.readAsText(file)
}


export async function setScriptToEditor(type, name, parent) {
  await tabPanel.addTab(name)
  var currentTab = tabPanel.state.value
  const editor = ace.edit('input'+currentTab)
  getScript(type, name, parent, editor)
}

export async function openStorage(name) {
  await tabPanel.addTab(name,2)
}
