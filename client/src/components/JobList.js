import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import moment from 'moment';
import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob } from '../redux/jobs' 

const queryString = require('query-string');


function mapStateToProps(state) {
  return {
    jobs: state.jobs.jobs
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob
}, dispatch)

class JobList extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.deleteJob = this.deleteJob.bind(this);
	}

	componentDidMount() {
		fetch('/jobs')
		      .then((response) => response.json())
		      .then((json) => {this.props.addJob(json);
		 })
    }

	deleteJob(e, id, i) {
		e.preventDefault();
		const { removeJob } = this.props;
		fetch(`/jobs/${id}`, {
		  method: 'DELETE'
			}).then((response) =>  {
				if(!response.ok) {
					console.log('server gave error response', response)
				}
		        console.log("ok");
				removeJob(id, i)
		    })
	}


	getTimeDiff(time) {
		var duration = moment.duration(moment(moment().format()).diff(time));
		if (duration.days()) {
			return 'Posted ' + duration.days() + ' ' + (duration.days() > 1 ? 'Days Ago' : 'Day Ago')
		} else if (duration.hours()) {
			return 'Posted ' + duration.hours() + ' ' + (duration.hours() > 1 ? 'Hours Ago' : 'Hour Ago')
		} else if (duration.minutes()) {
			return 'Posted ' + duration.minutes() + ' ' + (duration.minutes() > 1 ? 'Minutes Ago' : 'Minute Ago')
		} else {
			return 'Posted ' + duration.seconds() + ' ' + (duration.seconds() === 1 ? 'Second Ago' : 'Seconds Ago')
		}
	}

	getUserView(jobId, userId, key) {
		const user = window.localStorage.getItem("user_id");
		if(user == userId) {
			return (
				<p>
					<Link to={`/jobs/${jobId}/edit`}>Edit</Link>&nbsp;&nbsp;
			        <a href="" className="delete" onClick={e => this.deleteJob(e, jobId, key)}>Delete</a>	         
				</p>
			)
		} 
	}

	render() {

		//const jobArray = this.props.jobs.sort(function(a,b) {return (b.created_at > a.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);} );
		console.log('array jobs after sort', this.props.jobs);
		return(
	      <div className="jobList">
	        <h2 className="activity">Job Activity</h2><br/>
	        	<div className="jobs">
	        		{this.props.jobs.map((value, key) => {
	        			return (
	        				<span key={key}>
		        				<div className="job">
		        				    <Link to={`/jobs/${value.id}`}><h3>{value.position.toUpperCase()}</h3></Link>&nbsp;&nbsp;
			        				<p>{value.company} - {value.location}</p>
			        				<p className="description">{value.description}</p>
			        				<p>{value.salary}</p>
			        				<p>{this.getTimeDiff(value.created_at)}</p>
									<div>{this.getUserView(value.id, value.user_id, key)}</div>
			        			</div>
	        				</span>
	        			)
	        		})}
		      	</div>
	      </div>
      ) 
	}

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobList)
