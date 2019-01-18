import React, { Component } from 'react';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import Header from './components/layout/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from './context';


class App extends Component {
  render() {
    return (
      <Provider>
          <Header branding="Contact Manager"/>
          <div className="App">
          <div className="container">
            <AddContact/>
            <Contacts/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
