import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, addFormJob, removeJob } from '../redux/jobs' 


const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  addFormJob,
  removeJob
}, dispatch)

class JobList extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  addFormJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	}

	componentDidMount() {
		fetch('http://localhost:3001/jobs.json', {
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

	deleteJob(e, id) {
		fetch(`http://localhost:3001/jobs/${id}.json`, {
		  method: 'DELETE',
		  credentials: 'same-origin',
            credentials: 'include',
            mode: 'cors',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json'
			  }
			}).then(response => response.json());
	}


	render() {
		console.log(this.props)
		return(
	      <div className="jobList">
	        <h2 className="activity">Job Activity</h2><br/>
	        	<div className="jobs">
	        		{this.props.jobs.map((value, key) => {
	        			return (
	        				<span key={key}>
	        				<div className="job">
		        				<h3>{value.position.toUpperCase()}</h3>
		        				<span>{value.company} - {value.location}</span>
		        				<p className="description">{value.description}</p>
		        				<p>{value.salary}</p>
		        				<p>{moment(value.created_at, "YYYYMMDD").fromNow()}</p>
		        				<a className="edit" href='#'>Edit</a>&nbsp;&nbsp;
					            <a className="delete" href='#' onClick={e => this.deleteJob(e, value.id)}>Delete</a>
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
