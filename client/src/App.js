import React, { Component } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import { default as JobList } from './components/JobList';
import userRegistration from './components/userRegistration';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (    
	      <div className='rowC'>
	        <div className="jobForm">
            <JobForm/>
          </div>
          <JobList jobs={[]}/>
	      </div>
    )
  }
}

export default App;
