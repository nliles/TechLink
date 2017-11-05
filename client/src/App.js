import React, { Component } from 'react';
import JobList  from './components/JobList';
import EditJobForm from './components/EditJobForm';


class App extends Component {

  render() {
    return (    
    <div>
	      <div className='rowC'>
	        <div className="jobForm">
            <EditJobForm/>
          </div>
          <JobList jobs={[]}/>
	      </div>
    </div>
    )
  }
}

export default App;

