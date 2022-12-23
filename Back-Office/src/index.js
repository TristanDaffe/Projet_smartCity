import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
// import store from "./store";
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      {/* <Provider store={store}><App/></Provider> */}
      <App/>
  </React.StrictMode>,
);
serviceWorker.unregister();
