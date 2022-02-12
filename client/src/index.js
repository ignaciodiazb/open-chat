import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './routes/Home';
import PublicChat from './routes/PublicChat';
import PrivateChat from './routes/PrivateChat';
import Settings from './routes/Settings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { socket } from './services/socket';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App socket={socket} />}>
          <Route index element={<Home />} socket={socket} />
          <Route path='public-chat' element={<PublicChat socket={socket} />} />
          <Route path='private-chat' element={<PrivateChat socket={socket} />} />
          <Route path='settings' element={<Settings socket={socket} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
