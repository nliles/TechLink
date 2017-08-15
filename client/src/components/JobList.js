import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob } from '../redux/jobs' 


const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

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

	state = {}

	constructor(props) {
		super(props);

		this.deleteJob = this.deleteJob.bind(this);
	}

	componentDidMount() {
		fetch('/jobs.json', {
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		  }
		})
		.then(response => response.json())
		.then(json => {
		  json.forEach(job => {
		    this.props.addJob(job)
		  })
		})
	}

	deleteJob(e, id, i) {
		const { removeJob } = this.props;
		fetch(`/jobs/${id}.json`, {
		  method: 'DELETE',
		  credentials: 'same-origin',
            mode: 'cors',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			    'Access-Control-Allow-Origin': '*'
			  }
			}).then((response) =>  {
				if(!response.ok) {
					console.log('server gave error response', response)
				}
		        console.log("ok");
				removeJob(id, i)
		    }).catch((err) => console.log(err))
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

	render() {
		const jobArray = this.props.jobs.sort(function(a,b) {return (b.created_at > a.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);} ); 
		return(
	      <div className="jobList">
	        <h2 className="activity">Job Activity</h2><br/>
	        	<div className="jobs">
	        		{jobArray.map((value, key) => {
	        			return (
	        				<span key={key}>
	        				<div className="job">
		        				<h3>{value.position.toUpperCase()}</h3>
		        				<span>{value.company} - {value.location}</span>
		        				<br/>
		        				<p className="description">{value.description}</p>
		        				<p>{value.salary}</p>
		        				<p>{this.getTimeDiff(value.created_at)}</p>
		        				<Link to={'/jobs/${this.props.id}/edit'}>Edit</Link>&nbsp;&nbsp;
					            <button className="delete" onClick={e => this.deleteJob(e, value.id, key)}>Delete</button>
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
