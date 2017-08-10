import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

class JobList extends Component {
	componentDidMount() {
		console.log('test')
		const self = this;
	   $.ajax({
	      url: '/jobs',
	      dataType: 'json',
	      type: 'GET',
	      success: (data) => {
	        this.setState({data: data});
	        console.log(data);
	      },
	      error: (xhr, status, err) => {
	        this.setState({data: err});
	       console.error(self.props.url, status, err.toString());
	      }
	    });
	}

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
