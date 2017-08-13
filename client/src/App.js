import React, { Component } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import { default as JobList } from './components/JobList';


class App extends Component {
  render() {
    return (
      <div className='rowC'>
        <div className="jobForm"><JobForm/></div>
        <JobList jobs={[]}/>
      </div>
    )
  }
}

export default App;
