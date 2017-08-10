import React, { Component } from 'react';
import { render } from 'react-dom';

class JobList extends Component {
	   // $.ajax({
	   //    url: '/jobs',
	   //    dataType: 'json',
	   //    type: 'GET',
	   //    data: {jobs: jobs},
	   //    success: function(data) {
	   //      this.setState({data: job});
	   //    }.bind(this),
	   //    error: function(xhr, status, err) {
	   //      this.setState({data: job});
	   //     console.error(this.props.url, status, err.toString());
	   //    }.bind(this)
	   //  })

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
