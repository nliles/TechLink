import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob, setJobs } from '../actions/jobActions' 

function mapStateToProps(state) {
  return {
    jobs: state.jobs.jobs
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob,
  setJobs
}, dispatch)

class JobList extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.deleteJob = this.deleteJob.bind(this);
	}

	componentDidMount() {
		fetch('/jobs')
		      .then((response) => response.json())
		      .then((json) => {
		      	this.props.setJobs(json)
		 })
    }

	deleteJob(e, id, i, jobUserId) {
		e.preventDefault();
		var user_id = window.localStorage.getItem("user_id")
		if (parseInt(user_id) === jobUserId ) {
		fetch(`/jobs/${id}`, {
				method: 'DELETE'
				}).then(response =>  { if(!response.ok) { alert('Something went wrong. Please try again.') }
				    console.log(response);
					this.props.removeJob(id, i)
				})
		} 
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

	getUserView(jobId, userId, key, jobUserId) {
		const user = window.localStorage.getItem("user_id");
		if(parseInt(user) === userId) {
			return (
				<p>
					<Link to={`/jobs/${jobId}/edit`}>Edit</Link>&nbsp;&nbsp;
			        <a href="" className="delete" onClick={e => this.deleteJob(e, jobId, key, jobUserId)}>Delete</a>	         
				</p>
			)
		} 
	}

	render() {
	const jobArray = this.props.jobs.sort(function(a,b) {return (b.created_at > a.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);} );
		return(
	      <div className="jobList">
	        <h2 className="activity">Job Activity</h2><br/>
	        	<div className="jobs">
	        		{(jobArray || []).map((value, key) => {
	        			return (
	        				<span key={key}>
		        				<div className="job">
		        				    <Link to={`/jobs/${value.id}`}><h3>{value.position.toUpperCase()}</h3></Link>&nbsp;&nbsp;
			        				<p>{value.company} - {value.location}</p>
			        				<p className="description">{value.description}</p>
			        				<p>{value.salary}</p>
			        				<p>{this.getTimeDiff(value.created_at)}</p>
									<div>{this.getUserView(value.id, value.user_id, key, value.user_id)}</div>
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
