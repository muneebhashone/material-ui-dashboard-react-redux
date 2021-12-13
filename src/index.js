// import 'babel-polyfill';
// import 'quill/core.js';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
