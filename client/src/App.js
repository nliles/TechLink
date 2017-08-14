import React, { Component } from 'react';
import './App.css';
import EditJobForm from './components/EditJobForm';
import { default as JobList } from './components/JobList';
import JobForm from './components/JobForm';
import RegisterForm from './components/RegisterForm';
import NavBar from './components/NavBar';

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
    <div>
        <NavBar/>
	      <div className='rowC'>
	        <div className="jobForm">
            <JobForm/>
          </div>
          <JobList jobs={[]}/>
	      </div>
    </div>
    )
  }
}

export default App;

