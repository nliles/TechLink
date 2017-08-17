import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
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
    	position: '',
    	company: '',
    	location: '',
    	description: '',
    	salary: '',
    };
  }

  initialize(props){
	if (props.jobs.length>0){

	  	let job = props.jobs.find((element)=>{
	  		console.log(element.id, this.props.match.params.id)
	  		return element.id == parseInt(this.props.match.params.id)
	  	})
	  	
	  	this.setState({
	    	position: job.position,
	    	company: job.company,
	    	location: job.location,
	    	description: job.description,
	    	salary: job.salary
	  	})
  	}  	
  }

  componentDidMount(){
  	console.log('component mount')
  	this.initialize(this.props)
  }


  componentWillReceiveProps(nextProps){
  	
  	this.initialize(nextProps)

  }
	render() {
		return(
	      <div className="jobList">
	        <h2 className="activity">{this.state.position.toUpperCase()}</h2><br/>
	        	<div className="jobs">
	        				<div className="job">
		        				<span>{this.state.company} - {this.state.location}</span>
		        				<br/>
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