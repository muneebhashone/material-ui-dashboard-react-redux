import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

function Editor(props) {
  return <ReactQuill {...props} style={{ height: '420px' }} theme="snow" />;
}

export default Editor;
