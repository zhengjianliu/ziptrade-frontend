import './App.css';
import React, {Component} from 'react'
import ImageUploader from './components/ImageUploader'
import Locator from './components/locator';

class App extends Component{

  render(){
    return (
      <div className="App">
        {Locator()}
        <ImageUploader/>
      </div>
    );
  }
}

export default App;
