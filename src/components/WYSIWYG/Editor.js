import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <ReactQuill
        style={{ height: '420px' }}
        theme="snow"
        value={this.state.text}
        onChange={this.handleChange}
      />
    );
  }
}

function Editor() {
  const [editor, setEditor] = useState('');

  const handleChange = (content, delta, source, editor) => {
    setEditor(content);
    console.log('content', content);
  };

  return (
    <ReactQuill
      style={{ height: '420px' }}
      theme="snow"
      value={editor}
      onChange={handleChange}
    />
  );
}

export default Editor;
