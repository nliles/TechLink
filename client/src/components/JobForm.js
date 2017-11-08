import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addJob, removeJob, editJob } from '../actions/jobActions' 
import JobList  from './JobList';
import autocomplete  from './Autocomplete';


const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.jobs
  };
}


const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob,
  editJob
}, dispatch)


class EditJobForm extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	  editJob: PropTypes.func.isRequired
	}

  constructor(props) {
    super(props);
    this.state = {
    	id: this.props.id,
    	userId: '',
    	position: '',
    	company: '',
    	location: '',
    	description: '',
    	salary: '',
    	redirectToNewPage: false,	
    	isEditing: this.props.match ? true : false
    };                         
  }

  componentDidMount() {
	  	if (this.state.isEditing) {
	    fetch(`/jobs/${this.props.match.params.id}`)
	          .then((response) => response.json())
	          .then((json) =>  {
                let newState = Object.assign({}, this.state);
                newState = { userId: json.user_id, position: json.position, company: json.company, 
	                         location:json.location,lat: json.lat, lng: json.lng, description: json.description, salary: json.salary};
                this.setState(newState);
            })
	  	} 
    }

	handleSubmit(e) {
		e.preventDefault();
		var user_id = window.localStorage.getItem("user_id")
	    const { position, company, location, lat, lng, description, salary } = this.state
		const job = { job: {user_id, position, company, location, lat, lng, description, salary} }
		if (this.state.isEditing) {
			if (parseInt(user_id) === this.state.userId ) {
				this.apiEditJob(job)
			} else {
				alert("You are not authorized to edit this job")
			}	
		} 
		else  {
			if (user_id) {
				this.apiAddJob(job)
			} else {
				let newState = Object.assign({}, this.state);
                newState = { position: '', company: '', description: '', location: '', lat: '', lng: '', salary: ''};
                this.setState(newState);
				alert("Please sign in to post a new job listing.")
			}
		}
	}

	apiAddJob(job) {
		fetch('/jobs', {  
		  method: 'POST',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(job)
		})
		  .then(response => response.json())
	      .then((json) =>  {
                let newState = Object.assign({}, this.state);
                newState = { position: '', company: '', location: '', description: '', salary: ''}
                this.setState(newState),
                this.props.addJob(json);
            })
	      	.catch(err => console.log(err));	
	}

	apiEditJob(job) {
		fetch(`/jobs/${this.props.match.params.id}`, {  
		  method: 'PUT',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(job)
		})
		.then(response =>  response.json())
		.then(data => this.props.editJob(data),
		this.setState({ redirectToNewPage: true }))
	    .catch(err => console.log(err));	
	}

	handleChange = (arg) => {
        let newState = Object.assign({}, this.state);
        newState[Object.keys(arg)[0]] = Object.values(arg)[0];
        this.setState(newState);
	}

	render() {
        let heading = this.state.isEditing ? `Edit Job` : "Post a New Job";
	     if (this.state.redirectToNewPage) {
	     return (<Redirect to="/"/>)
	  	} else {
		return(
			<div>
				<div className='rowC'>
					<div className="jobForm">
						<form className="form" onSubmit={(e) => this.handleSubmit(e)}> 
					        <h2>{heading} </h2><br/>
					        <input ref="details" onChange={e => this.handleChange({ position: e.target.value})} placeholder="Position" value={this.state.position} type="text" name="position" className="input"/><br/><br/>
					        <input onChange={e => this.handleChange({ company: e.target.value})} 
					         value={this.state.company} placeholder="Company" type="text" name="company" className="input" /><br/><br/>
					        <input onChange={e => this.handleChange({ location: e.target.value})} value={this.state.location} 
					         placeholder="Location" type="text" name="location" className="input"
					         onFocus={e => autocomplete(e.target, this.state.lat, this.state.lng ,this.handleChange)} /><br/><br/>
					        <textarea onChange={e => this.handleChange({ description: e.target.value})} value={this.state.description} placeholder="Description" name="description" className="input textarea" ></textarea><br/><br/>
					        <label>Salary:</label><br/>
							<div className="salaryOptions" onClick={e => this.handleChange({ salary: e.target.value})}>
							    <div className="radioDiv">
								    <input type="radio" name="salary" className="radio" value="0-$30,000" checked={this.state.salary === "0-$30,000"}/> "0-$30k"
							    </div>
							    <div className="radioDiv">
								    <input type="radio" name="salary" className="radio" value="$31,000-$60,000" checked={this.state.salary === "$31,000-$60,000"}/> "$31-$60k"
							    </div>
							    <div className="radioDiv">
								    <input type="radio" name="salary" className="radio" value="$61,000-$99,000" checked={this.state.salary === "$61,000-$99,000"}/> "$61-$100k"
							    </div>
							    <div className="radioDiv">
								    <input type="radio" name="salary" className="radio" value="$100,000+" checked={this.state.salary === "$100,000+"}/> "$100k+"
							    </div><br/> 
						    </div> 
					        <button type="submit" className="button">Submit → </button>
					      </form>
				     </div>
		          <JobList jobs={[]}/>
				</div>
		    </div>  
	      )}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJobForm)