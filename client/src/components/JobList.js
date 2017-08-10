import React, { Component } from 'react';
import { render } from 'react-dom';

class JobList extends Component {
	render() {
		return(
	      <div className="jobList">
	        <h2 className="activity">Job Activity</h2><br/>
	        	<div className="job">
			      	<h3>{this.props.position}</h3>
			      	<span>{this.props.company} - {this.props.location}</span>
			      	<p>{this.props.description}</p>
			      	<p>{this.props.salary}</p>
		      	</div>
	      </div>
      ) 
	}
}

export default JobList;
