import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addJob, removeJob, editJob } from '../redux/jobs' 


const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob,
  editJob
}, dispatch)


class ShowJob extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	  editJob: PropTypes.func.isRequired
	}

  constructor(props) {
    super(props);
    this.state = {
    	id: this.props.match.params.id,
    	position: this.props.match.params.position,
    	company: this.props.match.params.company,
    	location: this.props.match.params.location,
    	description: this.props.match.params.description,
    	salary: this.props.match.params.salary,
    };
  }

	render() {
		return(
	      <div className="jobList">
	        <h2 className="activity">{this.state.position.toUpperCase()}</h2><br/>
	        	<div className="jobs">
        				<div className="job">
	        				<p>{this.state.company} - {this.state.location}</p>
	        				<p className="description">{this.state.description}</p>
	        				<p>{this.state.salary}</p>
	        				<p>{this.state.created_at}</p>
	        			</div>
		      	</div>

	      </div>
      ) 
	}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowJob)