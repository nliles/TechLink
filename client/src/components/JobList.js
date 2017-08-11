import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import moment from 'moment'

class JobList extends Component {
	constructor() {
		super();
		this.state = {
			jobs: []
		}
	}

	componentDidMount() {
		const self = this;
	   $.ajax({
	      url: '/jobs',
	      dataType: 'json',
	      type: 'GET',
	      success: (data) => {
	        this.setState({jobs: data});
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

	        	<div className="jobs">
	        		{this.state.jobs.map((value, key) => {
	        			return (
	        				<span key={key}>
	        				<div className="job">
		        				<h3>{value.position.toUpperCase()}</h3>
		        				<span>{value.company} - {value.location}</span>
		        				<p className="description">{value.description}</p>
		        				<p>{value.salary}</p>
		        				<p>{moment(value.created_at, "YYYYMMDD").fromNow()}</p>
		        			</div>
	        				</span>
	        			)
	        		})}
		      	</div>

	      </div>
      ) 
	}

}

export default JobList;
