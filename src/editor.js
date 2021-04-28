import React, { Component } from "react";
import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";

class Input extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.index = props.index
  }
  onChange(newValue) {
    // console.log('change', newValue);
  }

  render() {
    return (
      <AceEditor
        mode="ruby"
        ref={r => (this.editor = r)}
        theme="monokai"
        style={{width: '100%', height: '65%'}}
        onChange={this.onChange}
        name= {'input' + this.index}
        key= {'input' + this.index}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ tabSize: 2 }}
      />

    );
  }
}


class Output extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.index = props.index
  }
  onChange(newValue) {
    // console.log('change', newValue);
  }
  render() {
    return (
      <AceEditor
        mode="ruby"
        theme="monokai"
        // onChange={onChange}
        style={{ width: '100%', height: 'calc(35% - 78px)', borderTop: '1px solid #EBEDEF'}}
        name={'output' + this.index}
        key= {'output' + this.index}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          tabSize: 2,
          highlightActiveLine: false,
          readOnly: true,
          showGutter: false,
          // wrapEnabled: false,
          showPrintMargin: false
        }}
      />

    );
  }
}

export { Input };
export { Output };