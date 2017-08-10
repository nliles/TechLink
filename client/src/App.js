import React, { Component } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import JobList from './components/JobList';


class App extends Component {
  render() {
    return (
      <div className='rowC'>
        <div className="jobForm"><JobForm/></div>
        <JobList position="Junior Web Developer" company="Google" location="nyc" description="lorem ipsum" salary="30k-60k"/>
      </div>
    )
  }
}

export default App;
