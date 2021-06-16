import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
 
import store from './store';

import './assets/styles/global.css'

import Main from './components/layout/Main'

import Routes from './Routes';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Main>
        <Routes />
      </Main>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
