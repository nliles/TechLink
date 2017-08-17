import React, { Component } from 'react';
import JobList  from './components/JobList';
import JobForm from './components/JobForm';


class App extends Component {
  render() {
    return (    
    <div>
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

